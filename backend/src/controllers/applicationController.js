const prisma = require("../config/prisma");

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const parseDate = (value) => {
  return value ? new Date(value) : null;
};

const getUploadedFilePath = (file) => {
  if (!file) {
    return undefined;
  }

  return file.path.replace(/\\/g, "/").split("/uploads/").pop();
};

const applicationInclude = {
  faculty: true,
  course: true,
  class: true,
};

const buildApplicationPayload = (body, file) => {
  const payload = {
    fullName: body.fullName.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    facultyId: Number(body.facultyId),
    courseId: Number(body.courseId),
    classId: Number(body.classId),
  };

  if (body.address !== undefined) {
    payload.address = body.address || null;
  }

  if (body.dateOfBirth !== undefined) {
    payload.dateOfBirth = parseDate(body.dateOfBirth);
  }

  if (body.educationQualification !== undefined) {
    payload.educationQualification = body.educationQualification || null;
  }

  if (body.message !== undefined) {
    payload.message = body.message || null;
  }

  const uploadedFilePath = getUploadedFilePath(file);

  if (uploadedFilePath) {
    payload.documentPath = uploadedFilePath;
  }

  return payload;
};

const ensureValidApplicationRelations = async ({ facultyId, courseId, classId }) => {
  const [faculty, course, classRecord] = await Promise.all([
    prisma.faculty.findUnique({
      where: { id: facultyId },
      select: { id: true, status: true },
    }),
    prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, facultyId: true, status: true },
    }),
    prisma.class.findUnique({
      where: { id: classId },
      select: { id: true, courseId: true, status: true },
    }),
  ]);

  if (!faculty) {
    const error = new Error("Faculty not found");
    error.statusCode = 404;
    throw error;
  }

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  if (!classRecord) {
    const error = new Error("Class/cohort not found");
    error.statusCode = 404;
    throw error;
  }

  if (faculty.status !== "ACTIVE") {
    const error = new Error("Selected faculty is not active");
    error.statusCode = 400;
    throw error;
  }

  if (course.status !== "ACTIVE") {
    const error = new Error("Selected course is not active");
    error.statusCode = 400;
    throw error;
  }

  if (classRecord.status !== "ACTIVE") {
    const error = new Error("Selected class/cohort is not active");
    error.statusCode = 400;
    throw error;
  }

  if (course.facultyId !== facultyId) {
    const error = new Error("Selected course does not belong to the selected faculty");
    error.statusCode = 400;
    throw error;
  }

  if (classRecord.courseId !== courseId) {
    const error = new Error(
      "Selected class/cohort does not belong to the selected course"
    );
    error.statusCode = 400;
    throw error;
  }
};

const findApplicationOrRespond = async (id, res) => {
  const application = await prisma.application.findUnique({
    where: { id },
  });

  if (!application) {
    res.status(404).json({
      success: false,
      message: "Application not found",
    });
    return null;
  }

  return application;
};

const submitApplication = async (req, res, next) => {
  try {
    const data = buildApplicationPayload(req.body, req.file);

    await ensureValidApplicationRelations(data);

    const application = await prisma.application.create({
      data,
      include: applicationInclude,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const getAllApplications = async (req, res, next) => {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      include: applicationInclude,
    });

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await prisma.application.findUnique({
      where: { id },
      include: applicationInclude,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const existingApplication = await findApplicationOrRespond(id, res);

    if (!existingApplication) {
      return;
    }

    const application = await prisma.application.update({
      where: { id },
      data: {
        status: req.body.status,
      },
      include: applicationInclude,
    });

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const verifyApplication = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const existingApplication = await findApplicationOrRespond(id, res);

    if (!existingApplication) {
      return;
    }

    const application = await prisma.application.update({
      where: { id },
      data: {
        status: "VERIFIED",
        verificationStatus: "VERIFIED",
      },
      include: applicationInclude,
    });

    res.status(200).json({
      success: true,
      message: "Application verified successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const rejectApplication = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const existingApplication = await findApplicationOrRespond(id, res);

    if (!existingApplication) {
      return;
    }

    const application = await prisma.application.update({
      where: { id },
      data: {
        status: "REJECTED",
        verificationStatus: "REJECTED",
      },
      include: applicationInclude,
    });

    res.status(200).json({
      success: true,
      message: "Application rejected successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const existingApplication = await findApplicationOrRespond(id, res);

    if (!existingApplication) {
      return;
    }

    const application = await prisma.application.update({
      where: { id },
      data: {
        status: "REJECTED",
        verificationStatus: "REJECTED",
      },
      include: applicationInclude,
    });

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  verifyApplication,
  rejectApplication,
  deleteApplication,
};
