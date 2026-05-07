const prisma = require("../config/prisma");

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const getUploadedFilePath = (file) => {
  if (!file) {
    return undefined;
  }

  return file.path.replace(/\\/g, "/").split("/uploads/").pop();
};

const buildTestimonialPayload = (body, file) => {
  const payload = {};

  if (body.studentName !== undefined) {
    payload.studentName = body.studentName.trim();
  }

  if (body.courseName !== undefined) {
    payload.courseName = body.courseName.trim();
  }

  if (body.description !== undefined) {
    payload.description = body.description || null;
  }

  if (body.message !== undefined) {
    payload.message = body.message.trim();
  }

  if (body.status !== undefined) {
    payload.status = body.status;
  }

  const uploadedFilePath = getUploadedFilePath(file);

  if (uploadedFilePath) {
    payload.photo = uploadedFilePath;
  }

  return payload;
};

const createTestimonial = async (req, res, next) => {
  try {
    const data = buildTestimonialPayload(req.body, req.file);

    const testimonial = await prisma.testimonial.create({
      data,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

const getActiveTestimonials = async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

const getTestimonialById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const data = buildTestimonialPayload(req.body, req.file);

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        status: "INACTIVE",
      },
    });

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTestimonial,
  getActiveTestimonials,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
