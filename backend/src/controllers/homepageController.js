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

const buildHomepagePayload = (body, file) => {
  const payload = {};

  if (body.key !== undefined) {
    payload.key = body.key.trim();
  }

  if (body.title !== undefined) {
    payload.title = body.title || null;
  }

  if (body.content !== undefined) {
    payload.content = body.content;
  }

  if (body.order !== undefined) {
    payload.order = Number(body.order);
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

const ensureUniqueKey = async (key, homepageContentId) => {
  if (!key) {
    return;
  }

  const homepageContent = await prisma.homepageContent.findUnique({
    where: { key },
    select: { id: true },
  });

  if (homepageContent && homepageContent.id !== homepageContentId) {
    const error = new Error("Homepage content key already exists");
    error.statusCode = 409;
    throw error;
  }
};

const createHomepageContent = async (req, res, next) => {
  try {
    const data = buildHomepagePayload(req.body, req.file);

    await ensureUniqueKey(data.key);

    const homepageContent = await prisma.homepageContent.create({
      data,
    });

    res.status(201).json({
      success: true,
      message: "Homepage content created successfully",
      data: homepageContent,
    });
  } catch (error) {
    next(error);
  }
};

const getActiveHomepageContent = async (req, res, next) => {
  try {
    const homepageContent = await prisma.homepageContent.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    res.status(200).json({
      success: true,
      data: homepageContent,
    });
  } catch (error) {
    next(error);
  }
};

const getHomepageContentByKey = async (req, res, next) => {
  try {
    const { key } = req.params;

    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Invalid homepage content key",
      });
    }

    const homepageContent = await prisma.homepageContent.findFirst({
      where: {
        key,
        status: "ACTIVE",
      },
    });

    if (!homepageContent) {
      return res.status(404).json({
        success: false,
        message: "Homepage content not found",
      });
    }

    res.status(200).json({
      success: true,
      data: homepageContent,
    });
  } catch (error) {
    next(error);
  }
};

const getAllHomepageContent = async (req, res, next) => {
  try {
    const homepageContent = await prisma.homepageContent.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    res.status(200).json({
      success: true,
      data: homepageContent,
    });
  } catch (error) {
    next(error);
  }
};

const getHomepageContentById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid homepage content ID",
      });
    }

    const homepageContent = await prisma.homepageContent.findUnique({
      where: { id },
    });

    if (!homepageContent) {
      return res.status(404).json({
        success: false,
        message: "Homepage content not found",
      });
    }

    res.status(200).json({
      success: true,
      data: homepageContent,
    });
  } catch (error) {
    next(error);
  }
};

const updateHomepageContent = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid homepage content ID",
      });
    }

    const existingHomepageContent = await prisma.homepageContent.findUnique({
      where: { id },
    });

    if (!existingHomepageContent) {
      return res.status(404).json({
        success: false,
        message: "Homepage content not found",
      });
    }

    const data = buildHomepagePayload(req.body, req.file);

    await ensureUniqueKey(data.key, id);

    const homepageContent = await prisma.homepageContent.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Homepage content updated successfully",
      data: homepageContent,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHomepageContent = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid homepage content ID",
      });
    }

    const existingHomepageContent = await prisma.homepageContent.findUnique({
      where: { id },
    });

    if (!existingHomepageContent) {
      return res.status(404).json({
        success: false,
        message: "Homepage content not found",
      });
    }

    const homepageContent = await prisma.homepageContent.update({
      where: { id },
      data: {
        status: "INACTIVE",
      },
    });

    res.status(200).json({
      success: true,
      message: "Homepage content deleted successfully",
      data: homepageContent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHomepageContent,
  deleteHomepageContent,
  getActiveHomepageContent,
  getAllHomepageContent,
  getHomepageContentById,
  getHomepageContentByKey,
  updateHomepageContent,
};