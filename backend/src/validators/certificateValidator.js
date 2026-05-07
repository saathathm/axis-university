const certificateStatuses = ["VALID", "EXPIRED", "REVOKED"];

const isPositiveInteger = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0;
};

const isValidDate = (value) => {
  return value !== undefined && value !== "" && !Number.isNaN(Date.parse(value));
};

const isOptionalValidDate = (value) => {
  return value === undefined || value === "" || !Number.isNaN(Date.parse(value));
};

const validateCreateCertificate = (req, res, next) => {
  const {
    applicationId,
    courseId,
    studentName,
    issueDate,
    expiryDate,
    status,
  } = req.body;

  if (
    applicationId !== undefined &&
    applicationId !== "" &&
    !isPositiveInteger(applicationId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Application ID must be valid",
    });
  }

  if (!isPositiveInteger(courseId)) {
    return res.status(400).json({
      success: false,
      message: "A valid course ID is required",
    });
  }

  if (!studentName || !studentName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Student name is required",
    });
  }

  if (!isValidDate(issueDate)) {
    return res.status(400).json({
      success: false,
      message: "Issue date is required and must be a valid date",
    });
  }

  if (!isOptionalValidDate(expiryDate)) {
    return res.status(400).json({
      success: false,
      message: "Expiry date must be a valid date",
    });
  }

  if (status && !certificateStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Certificate status must be VALID, EXPIRED, or REVOKED",
    });
  }

  next();
};

const validateUpdateCertificate = (req, res, next) => {
  const {
    applicationId,
    courseId,
    studentName,
    issueDate,
    expiryDate,
    status,
  } = req.body;

  if (
    applicationId !== undefined &&
    applicationId !== "" &&
    !isPositiveInteger(applicationId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Application ID must be valid",
    });
  }

  if (courseId !== undefined && !isPositiveInteger(courseId)) {
    return res.status(400).json({
      success: false,
      message: "Course ID must be valid",
    });
  }

  if (studentName !== undefined && !studentName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Student name cannot be empty",
    });
  }

  if (issueDate !== undefined && !isValidDate(issueDate)) {
    return res.status(400).json({
      success: false,
      message: "Issue date must be a valid date",
    });
  }

  if (!isOptionalValidDate(expiryDate)) {
    return res.status(400).json({
      success: false,
      message: "Expiry date must be a valid date",
    });
  }

  if (status && !certificateStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Certificate status must be VALID, EXPIRED, or REVOKED",
    });
  }

  next();
};

module.exports = {
  validateCreateCertificate,
  validateUpdateCertificate,
};
