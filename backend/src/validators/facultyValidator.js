const allowedStatuses = ["ACTIVE", "INACTIVE"];

const isValidBooleanLike = (value) => {
  return ["true", "false", true, false, "1", "0", 1, 0].includes(value);
};

const validateCreateFaculty = (req, res, next) => {
  const { name, status, isPopular } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Faculty name is required",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Faculty status must be ACTIVE or INACTIVE",
    });
  }

  if (isPopular !== undefined && !isValidBooleanLike(isPopular)) {
    return res.status(400).json({
      success: false,
      message: "Popular status must be true or false",
    });
  }

  next();
};

const validateUpdateFaculty = (req, res, next) => {
  const { name, status, isPopular } = req.body;

  if (name !== undefined && !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Faculty name cannot be empty",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Faculty status must be ACTIVE or INACTIVE",
    });
  }

  if (isPopular !== undefined && !isValidBooleanLike(isPopular)) {
    return res.status(400).json({
      success: false,
      message: "Popular status must be true or false",
    });
  }

  next();
};

module.exports = {
  validateCreateFaculty,
  validateUpdateFaculty,
};
