const allowedStatuses = ["ACTIVE", "INACTIVE"];
const allowedCategories = ["NEWS", "EVENT"];

const validateCreateNews = (req, res, next) => {
  const { title, category, status, featured } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "News title is required",
    });
  }

  if (category && !allowedCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "News category must be NEWS or EVENT",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "News status must be ACTIVE or INACTIVE",
    });
  }

  if (featured !== undefined && !["true", "false", true, false, "1", "0", 1, 0].includes(featured)) {
    return res.status(400).json({
      success: false,
      message: "Featured flag must be true or false",
    });
  }

  next();
};

const validateUpdateNews = (req, res, next) => {
  const { title, category, status, featured } = req.body;

  if (title !== undefined && !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "News title cannot be empty",
    });
  }

  if (category && !allowedCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "News category must be NEWS or EVENT",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "News status must be ACTIVE or INACTIVE",
    });
  }

  if (featured !== undefined && !["true", "false", true, false, "1", "0", 1, 0].includes(featured)) {
    return res.status(400).json({
      success: false,
      message: "Featured flag must be true or false",
    });
  }

  next();
};

module.exports = {
  validateCreateNews,
  validateUpdateNews,
};