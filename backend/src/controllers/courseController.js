const prisma = require("../config/prisma");
const slugify = require("../utils/slugify");

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const parseBoolean = (value) => {
  return [true, "true", "1", 1].includes(value);
};

const getUploadedFilePath = (file) => {
  if (!file) {
    return undefined;
  }

  return file.path.replace(/\\/g, "/").split("/uploads/").pop();
};

const buildCoursePayload = (body, file, existingCourse) => {
  const payload = {};

  if (body.facultyId !== undefined) {
    payload.facultyId = Number(body.facultyId);
  }

  if (body.name !== undefined) {
    payload.name = body.name.trim();
  }

  if (body.slug !== undefined) {
    payload.slug = slugify(body.slug);
  } else if (!existingCourse && body.name !== undefined) {
    payload.slug = slugify(body.name);
  }

  if (body.shortOverview !== undefined) {
    payload.shortOverview = body.shortOverview || null;
  }

  if (body.description !== undefined) {
    payload.description = body.description || null;
  }

  if (body.duration !== undefined) {
    payload.duration = body.duration || null;
  }

  if (body.requirements !== undefined) {
    payload.requirements = body.requirements || null;
  }

  if (body.fee !== undefined) {
    payload.fee = body.fee === "" ? null : body.fee;
  }

  if (body.hasCertificate !== undefined) {
    payload.hasCertificate = parseBoolean(body.hasCertificate);
  }

  if (body.status !== undefined) {
    payload.status = body.status;
  }

  const uploadedFilePath = getUploadedFilePath(file);

  if (uploadedFilePath) {
    payload.image = uploadedFilePath;
  }

  return payload;
};

const ensureFacultyExists = async (facultyId) => {
  if (!facultyId) {
    return;
  }

  const faculty = await prisma.faculty.findUnique({
    where: { id: facultyId },
    select: { id: true },
  });

  if (!faculty) {
    const error = new Error("Faculty not found");
    error.statusCode = 404;
    throw error;
  }
};

const ensureUniqueSlug = async (slug, courseId) => {
  if (!slug) {
    return;
  }

  const course = await prisma.course.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (course && course.id !== courseId) {
    const error = new Error("Course slug already exists");
    error.statusCode = 409;
    throw error;
  }
};

const createCourse = async (req, res, next) => {
  try {
    const data = buildCoursePayload(req.body, req.file);

    await ensureFacultyExists(data.facultyId);
    await ensureUniqueSlug(data.slug);

    const course = await prisma.course.create({
      data,
      include: {
        faculty: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: { createdAt: "desc" },
      include: {
        faculty: true,
        _count: {
          select: {
            classes: true,
            applications: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const course = await prisma.course.findFirst({
      where: {
        id,
        status: "ACTIVE",
      },
      include: {
        faculty: true,
        classes: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            startDate: "asc",
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const getCoursesByFaculty = async (req, res, next) => {
  try {
    const facultyId = parseId(req.params.facultyId);

    if (!facultyId) {
      return res.status(400).json({
        success: false,
        message: "Invalid faculty ID",
      });
    }

    const faculty = await prisma.faculty.findUnique({
      where: { id: facultyId },
      select: { id: true, name: true, status: true },
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const courses = await prisma.course.findMany({
      where: {
        facultyId,
        status: "ACTIVE",
      },
      orderBy: { createdAt: "desc" },
      include: {
        faculty: true,
        _count: {
          select: {
            classes: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const data = buildCoursePayload(req.body, req.file, existingCourse);

    await ensureFacultyExists(data.facultyId);
    await ensureUniqueSlug(data.slug, id);

    const course = await prisma.course.update({
      where: { id },
      data,
      include: {
        faculty: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const course = await prisma.course.update({
      where: { id },
      data: {
        status: "INACTIVE",
      },
    });

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  getCoursesByFaculty,
  updateCourse,
  deleteCourse,
};
