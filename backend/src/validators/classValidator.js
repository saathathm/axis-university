const allowedStatuses = ["ACTIVE", "INACTIVE"];

const isPositiveInteger = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0;
};

const isNonNegativeInteger = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0;
};

const isValidDate = (value) => {
  return value === undefined || value === "" || !Number.isNaN(Date.parse(value));
};

const validateCreateClass = (req, res, next) => {
  const { courseId, name, startDate, endDate, availableSeats, status } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Class/cohort name is required",
    });
  }

  if (!isPositiveInteger(courseId)) {
    return res.status(400).json({
      success: false,
      message: "A valid course ID is required",
    });
  }

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).json({
      success: false,
      message: "Start date and end date must be valid dates",
    });
  }

  if (
    availableSeats !== undefined &&
    availableSeats !== "" &&
    !isNonNegativeInteger(availableSeats)
  ) {
    return res.status(400).json({
      success: false,
      message: "Available seats must be a non-negative whole number",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Class/cohort status must be ACTIVE or INACTIVE",
    });
  }

  next();
};

const validateUpdateClass = (req, res, next) => {
  const { courseId, name, startDate, endDate, availableSeats, status } = req.body;

  if (name !== undefined && !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Class/cohort name cannot be empty",
    });
  }

  if (courseId !== undefined && !isPositiveInteger(courseId)) {
    return res.status(400).json({
      success: false,
      message: "Course ID must be valid",
    });
  }

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).json({
      success: false,
      message: "Start date and end date must be valid dates",
    });
  }

  if (
    availableSeats !== undefined &&
    availableSeats !== "" &&
    !isNonNegativeInteger(availableSeats)
  ) {
    return res.status(400).json({
      success: false,
      message: "Available seats must be a non-negative whole number",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Class/cohort status must be ACTIVE or INACTIVE",
    });
  }

  next();
};

module.exports = {
  validateCreateClass,
  validateUpdateClass,
};
