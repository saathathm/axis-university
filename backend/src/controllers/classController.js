const prisma = require("../config/prisma");

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const parseDate = (value) => {
  return value ? new Date(value) : null;
};

const buildClassPayload = (body) => {
  const payload = {};

  if (body.courseId !== undefined) {
    payload.courseId = Number(body.courseId);
  }

  if (body.name !== undefined) {
    payload.name = body.name.trim();
  }

  if (body.startDate !== undefined) {
    payload.startDate = parseDate(body.startDate);
  }

  if (body.endDate !== undefined) {
    payload.endDate = parseDate(body.endDate);
  }

  if (body.schedule !== undefined) {
    payload.schedule = body.schedule || null;
  }

  if (body.availableSeats !== undefined) {
    payload.availableSeats =
      body.availableSeats === "" ? null : Number(body.availableSeats);
  }

  if (body.status !== undefined) {
    payload.status = body.status;
  }

  return payload;
};

const ensureCourseExists = async (courseId) => {
  if (!courseId) {
    return;
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true },
  });

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }
};

const createClass = async (req, res, next) => {
  try {
    const data = buildClassPayload(req.body);

    await ensureCourseExists(data.courseId);

    const classRecord = await prisma.class.create({
      data,
      include: {
        course: {
          include: {
            faculty: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Class/cohort created successfully",
      data: classRecord,
    });
  } catch (error) {
    next(error);
  }
};

const getAllClasses = async (req, res, next) => {
  try {
    const classes = await prisma.class.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: [{ startDate: "asc" }, { createdAt: "desc" }],
      include: {
        course: {
          include: {
            faculty: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

const getClassById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid class/cohort ID",
      });
    }

    const classRecord = await prisma.class.findFirst({
      where: {
        id,
        status: "ACTIVE",
      },
      include: {
        course: {
          include: {
            faculty: true,
          },
        },
      },
    });

    if (!classRecord) {
      return res.status(404).json({
        success: false,
        message: "Class/cohort not found",
      });
    }

    res.status(200).json({
      success: true,
      data: classRecord,
    });
  } catch (error) {
    next(error);
  }
};

const getClassesByCourse = async (req, res, next) => {
  try {
    const courseId = parseId(req.params.courseId);

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, name: true, status: true },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const classes = await prisma.class.findMany({
      where: {
        courseId,
        status: "ACTIVE",
      },
      orderBy: [{ startDate: "asc" }, { createdAt: "desc" }],
      include: {
        course: {
          include: {
            faculty: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

const updateClass = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid class/cohort ID",
      });
    }

    const existingClass = await prisma.class.findUnique({
      where: { id },
    });

    if (!existingClass) {
      return res.status(404).json({
        success: false,
        message: "Class/cohort not found",
      });
    }

    const data = buildClassPayload(req.body);

    await ensureCourseExists(data.courseId);

    const classRecord = await prisma.class.update({
      where: { id },
      data,
      include: {
        course: {
          include: {
            faculty: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Class/cohort updated successfully",
      data: classRecord,
    });
  } catch (error) {
    next(error);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid class/cohort ID",
      });
    }

    const existingClass = await prisma.class.findUnique({
      where: { id },
    });

    if (!existingClass) {
      return res.status(404).json({
        success: false,
        message: "Class/cohort not found",
      });
    }

    const classRecord = await prisma.class.update({
      where: { id },
      data: {
        status: "INACTIVE",
      },
    });

    res.status(200).json({
      success: true,
      message: "Class/cohort deleted successfully",
      data: classRecord,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  getClassesByCourse,
  updateClass,
  deleteClass,
};
