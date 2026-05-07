const allowedStatuses = ["ACTIVE", "INACTIVE"];

const validateCreateHomepageContent = (req, res, next) => {
  const { key, content, status } = req.body;

  if (!key || !key.trim()) {
    return res.status(400).json({
      success: false,
      message: "Homepage content key is required",
    });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Homepage content is required",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Homepage content status must be ACTIVE or INACTIVE",
    });
  }

  next();
};

const validateUpdateHomepageContent = (req, res, next) => {
  const { key, content, status } = req.body;

  if (key !== undefined && !key.trim()) {
    return res.status(400).json({
      success: false,
      message: "Homepage content key cannot be empty",
    });
  }

  if (content !== undefined && !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Homepage content cannot be empty",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Homepage content status must be ACTIVE or INACTIVE",
    });
  }

  next();
};

module.exports = {
  validateCreateHomepageContent,
  validateUpdateHomepageContent,
};