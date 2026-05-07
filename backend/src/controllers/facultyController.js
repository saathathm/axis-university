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

const buildFacultyPayload = (body, file, existingFaculty) => {
  const payload = {};

  if (body.name !== undefined) {
    payload.name = body.name.trim();
  }

  if (body.slug !== undefined) {
    payload.slug = slugify(body.slug);
  } else if (!existingFaculty && body.name !== undefined) {
    payload.slug = slugify(body.name);
  }

  if (body.shortDescription !== undefined) {
    payload.shortDescription = body.shortDescription || null;
  }

  if (body.fullDescription !== undefined) {
    payload.fullDescription = body.fullDescription || null;
  }

  if (body.isPopular !== undefined) {
    payload.isPopular = parseBoolean(body.isPopular);
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

const ensureUniqueSlug = async (slug, facultyId) => {
  if (!slug) {
    return;
  }

  const faculty = await prisma.faculty.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (faculty && faculty.id !== facultyId) {
    const error = new Error("Faculty slug already exists");
    error.statusCode = 409;
    throw error;
  }
};

const createFaculty = async (req, res, next) => {
  try {
    const data = buildFacultyPayload(req.body, req.file);

    await ensureUniqueSlug(data.slug);

    const faculty = await prisma.faculty.create({
      data,
    });

    res.status(201).json({
      success: true,
      message: "Faculty created successfully",
      data: faculty,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFaculties = async (req, res, next) => {
  try {
    const faculties = await prisma.faculty.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            courses: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: faculties,
    });
  } catch (error) {
    next(error);
  }
};

const getFacultyById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid faculty ID",
      });
    }

    const faculty = await prisma.faculty.findUnique({
      where: { id },
      include: {
        courses: true,
        _count: {
          select: {
            courses: true,
          },
        },
      },
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    next(error);
  }
};

const updateFaculty = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid faculty ID",
      });
    }

    const existingFaculty = await prisma.faculty.findUnique({
      where: { id },
    });

    if (!existingFaculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const data = buildFacultyPayload(req.body, req.file, existingFaculty);

    await ensureUniqueSlug(data.slug, id);

    const faculty = await prisma.faculty.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      data: faculty,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFaculty = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid faculty ID",
      });
    }

    const existingFaculty = await prisma.faculty.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            courses: true,
            applications: true,
          },
        },
      },
    });

    if (!existingFaculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    if (
      existingFaculty._count.courses > 0 ||
      existingFaculty._count.applications > 0
    ) {
      return res.status(409).json({
        success: false,
        message:
          "Faculty cannot be deleted while courses or applications are linked to it",
      });
    }

    await prisma.faculty.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
