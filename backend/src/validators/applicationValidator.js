const applicationStatuses = [
  "PENDING",
  "UNDER_REVIEW",
  "VERIFIED",
  "APPROVED",
  "REJECTED",
  "ENROLLED",
];

const isPositiveInteger = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0;
};

const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const isValidDate = (value) => {
  return value === undefined || value === "" || !Number.isNaN(Date.parse(value));
};

const validateCreateApplication = (req, res, next) => {
  const { fullName, email, phone, facultyId, courseId, classId, dateOfBirth } =
    req.body;

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Full name is required",
    });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required",
    });
  }

  if (!phone || !phone.trim()) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }

  if (!isPositiveInteger(facultyId)) {
    return res.status(400).json({
      success: false,
      message: "A valid faculty ID is required",
    });
  }

  if (!isPositiveInteger(courseId)) {
    return res.status(400).json({
      success: false,
      message: "A valid course ID is required",
    });
  }

  if (!isPositiveInteger(classId)) {
    return res.status(400).json({
      success: false,
      message: "A valid class/cohort ID is required",
    });
  }

  if (!isValidDate(dateOfBirth)) {
    return res.status(400).json({
      success: false,
      message: "Date of birth must be a valid date",
    });
  }

  next();
};

const validateApplicationStatus = (req, res, next) => {
  const { status } = req.body;

  if (!applicationStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid application status",
    });
  }

  next();
};

module.exports = {
  validateCreateApplication,
  validateApplicationStatus,
};
