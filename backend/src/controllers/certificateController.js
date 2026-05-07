const prisma = require("../config/prisma");
const generateCertificateNumber = require("../utils/generateCertificateNumber");

const allowedApplicationStatuses = ["VERIFIED", "APPROVED", "ENROLLED"];

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const parseDate = (value) => {
  return value ? new Date(value) : null;
};

const certificateInclude = {
  application: true,
  course: true,
};

const buildCertificatePayload = (body) => {
  const payload = {};

  if (body.certificateNumber !== undefined) {
    payload.certificateNumber = body.certificateNumber.trim();
  }

  if (body.applicationId !== undefined) {
    payload.applicationId =
      body.applicationId === "" ? null : Number(body.applicationId);
  }

  if (body.courseId !== undefined) {
    payload.courseId = Number(body.courseId);
  }

  if (body.studentName !== undefined) {
    payload.studentName = body.studentName.trim();
  }

  if (body.issueDate !== undefined) {
    payload.issueDate = parseDate(body.issueDate);
  }

  if (body.expiryDate !== undefined) {
    payload.expiryDate = parseDate(body.expiryDate);
  }

  if (body.status !== undefined) {
    payload.status = body.status;
  }

  if (body.notes !== undefined) {
    payload.notes = body.notes || null;
  }

  return payload;
};

const ensureUniqueCertificateNumber = async (certificateNumber, certificateId) => {
  if (!certificateNumber) {
    return;
  }

  const certificate = await prisma.certificate.findUnique({
    where: { certificateNumber },
    select: { id: true },
  });

  if (certificate && certificate.id !== certificateId) {
    const error = new Error("Certificate number already exists");
    error.statusCode = 409;
    throw error;
  }
};

const createUniqueCertificateNumber = async () => {
  let certificateNumber = generateCertificateNumber();
  let existingCertificate = await prisma.certificate.findUnique({
    where: { certificateNumber },
    select: { id: true },
  });

  while (existingCertificate) {
    certificateNumber = generateCertificateNumber();
    existingCertificate = await prisma.certificate.findUnique({
      where: { certificateNumber },
      select: { id: true },
    });
  }

  return certificateNumber;
};

const ensureValidCertificateRelations = async ({ applicationId, courseId }) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true },
  });

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  if (!applicationId) {
    return;
  }

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: {
      id: true,
      courseId: true,
      status: true,
    },
  });

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  if (!allowedApplicationStatuses.includes(application.status)) {
    const error = new Error(
      "Certificate can only be created for verified, approved, or enrolled applications"
    );
    error.statusCode = 400;
    throw error;
  }

  if (application.courseId !== courseId) {
    const error = new Error("Selected application does not belong to the selected course");
    error.statusCode = 400;
    throw error;
  }
};

const createCertificate = async (req, res, next) => {
  try {
    const data = buildCertificatePayload(req.body);

    if (!data.certificateNumber) {
      data.certificateNumber = await createUniqueCertificateNumber();
    }

    await ensureUniqueCertificateNumber(data.certificateNumber);
    await ensureValidCertificateRelations(data);

    const certificate = await prisma.certificate.create({
      data,
      include: certificateInclude,
    });

    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCertificates = async (req, res, next) => {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
      include: certificateInclude,
    });

    res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    next(error);
  }
};

const getCertificateById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { id },
      include: certificateInclude,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    next(error);
  }
};

const updateCertificate = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    const existingCertificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!existingCertificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    const data = buildCertificatePayload(req.body);
    const relationData = {
      applicationId:
        data.applicationId !== undefined
          ? data.applicationId
          : existingCertificate.applicationId,
      courseId: data.courseId || existingCertificate.courseId,
    };

    await ensureUniqueCertificateNumber(data.certificateNumber, id);
    await ensureValidCertificateRelations(relationData);

    const certificate = await prisma.certificate.update({
      where: { id },
      data,
      include: certificateInclude,
    });

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCertificate = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    const existingCertificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!existingCertificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        status: "REVOKED",
      },
      include: certificateInclude,
    });

    res.status(200).json({
      success: true,
      message: "Certificate revoked successfully",
      data: certificate,
    });
  } catch (error) {
    next(error);
  }
};

const verifyCertificate = async (req, res, next) => {
  try {
    const certificateNumber = req.params.certificateNumber.trim();

    const certificate = await prisma.certificate.findUnique({
      where: { certificateNumber },
      include: {
        course: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Invalid certificate",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certificate found",
      data: {
        studentName: certificate.studentName,
        courseName: certificate.course.name,
        certificateNumber: certificate.certificateNumber,
        issueDate: certificate.issueDate,
        expiryDate: certificate.expiryDate,
        status: certificate.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
  verifyCertificate,
};
