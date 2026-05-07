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

const parseDateValue = (value) => {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === "") {
    return null;
  }

  const parsedDate = new Date(value);

  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

const buildNewsPayload = (body, file, existingNews) => {
  const payload = {};

  if (body.title !== undefined) {
    payload.title = body.title.trim();
  }

  if (body.slug !== undefined) {
    payload.slug = slugify(body.slug);
  } else if (!existingNews && body.title !== undefined) {
    payload.slug = slugify(body.title);
  }

  if (body.description !== undefined) {
    payload.description = body.description || null;
  }

  if (body.content !== undefined) {
    payload.content = body.content || null;
  }

  if (body.category !== undefined) {
    payload.category = body.category;
  }

  if (body.startDate !== undefined) {
    payload.startDate = parseDateValue(body.startDate);
  }

  if (body.endDate !== undefined) {
    payload.endDate = parseDateValue(body.endDate);
  }

  if (body.location !== undefined) {
    payload.location = body.location || null;
  }

  if (body.featured !== undefined) {
    payload.featured = parseBoolean(body.featured);
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

const ensureUniqueSlug = async (slug, newsId) => {
  if (!slug) {
    return;
  }

  const news = await prisma.news.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (news && news.id !== newsId) {
    const error = new Error("News slug already exists");
    error.statusCode = 409;
    throw error;
  }
};

const createNews = async (req, res, next) => {
  try {
    const data = buildNewsPayload(req.body, req.file);

    await ensureUniqueSlug(data.slug);

    const news = await prisma.news.create({
      data,
    });

    res.status(201).json({
      success: true,
      message: "News created successfully",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const getActiveNews = async (req, res, next) => {
  try {
    const news = await prisma.news.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: [
        { featured: "desc" },
        { startDate: "desc" },
        { createdAt: "desc" },
      ],
    });

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const getAllNews = async (req, res, next) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const getNewsBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Invalid news slug",
      });
    }

    const news = await prisma.news.findFirst({
      where: {
        slug,
        status: "ACTIVE",
      },
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const getNewsById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID",
      });
    }

    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const updateNews = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID",
      });
    }

    const existingNews = await prisma.news.findUnique({
      where: { id },
    });

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    const data = buildNewsPayload(req.body, req.file, existingNews);

    await ensureUniqueSlug(data.slug, id);

    const news = await prisma.news.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID",
      });
    }

    const existingNews = await prisma.news.findUnique({
      where: { id },
    });

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    const news = await prisma.news.update({
      where: { id },
      data: {
        status: "INACTIVE",
      },
    });

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNews,
  deleteNews,
  getActiveNews,
  getAllNews,
  getNewsById,
  getNewsBySlug,
  updateNews,
};