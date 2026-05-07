const allowedStatuses = ["ACTIVE", "INACTIVE"];

const validateCreateTestimonial = (req, res, next) => {
  const { studentName, courseName, message, status } = req.body;

  if (!studentName || !studentName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Student name is required",
    });
  }

  if (!courseName || !courseName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Course name is required",
    });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Testimonial message is required",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Testimonial status must be ACTIVE or INACTIVE",
    });
  }

  next();
};

const validateUpdateTestimonial = (req, res, next) => {
  const { studentName, courseName, message, status } = req.body;

  if (studentName !== undefined && !studentName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Student name cannot be empty",
    });
  }

  if (courseName !== undefined && !courseName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Course name cannot be empty",
    });
  }

  if (message !== undefined && !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Testimonial message cannot be empty",
    });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Testimonial status must be ACTIVE or INACTIVE",
    });
  }

  next();
};

module.exports = {
  validateCreateTestimonial,
  validateUpdateTestimonial,
};
