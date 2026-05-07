const allowedStatuses = ["ACTIVE", "INACTIVE"];

const isPositiveInteger = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0;
};

const isValidBooleanLike = (value) => {
  return ["true", "false", true, false, "1", "0", 1, 0].includes(value);
};

const isValidFee = (value) => {
  return value === undefined || value === "" || !Number.isNaN(Number(value));
};

const validateCreateCourse = (req, res, next) => {
  const { facultyId, name, status, hasCertificate, fee } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Course name is required",
    });
  }

  if (!isPositiveInteger(facultyId)) {
    return res.status(400).json({
      success: false,
      message: "A valid faculty ID is required",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Course status must be ACTIVE or INACTIVE",
    });
  }

  if (hasCertificate !== undefined && !isValidBooleanLike(hasCertificate)) {
    return res.status(400).json({
      success: false,
      message: "Certificate availability must be true or false",
    });
  }

  if (!isValidFee(fee)) {
    return res.status(400).json({
      success: false,
      message: "Course fee must be a valid number",
    });
  }

  next();
};

const validateUpdateCourse = (req, res, next) => {
  const { facultyId, name, status, hasCertificate, fee } = req.body;

  if (name !== undefined && !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Course name cannot be empty",
    });
  }

  if (facultyId !== undefined && !isPositiveInteger(facultyId)) {
    return res.status(400).json({
      success: false,
      message: "Faculty ID must be valid",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Course status must be ACTIVE or INACTIVE",
    });
  }

  if (hasCertificate !== undefined && !isValidBooleanLike(hasCertificate)) {
    return res.status(400).json({
      success: false,
      message: "Certificate availability must be true or false",
    });
  }

  if (!isValidFee(fee)) {
    return res.status(400).json({
      success: false,
      message: "Course fee must be a valid number",
    });
  }

  next();
};

module.exports = {
  validateCreateCourse,
  validateUpdateCourse,
};
