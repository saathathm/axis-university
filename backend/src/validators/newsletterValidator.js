const validateEmail = (email) => {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const validateSubscribeNewsletter = (req, res, next) => {
  const { email, firstName, lastName } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Valid email is required",
    });
  }

  if (firstName !== undefined && !firstName.trim()) {
    return res.status(400).json({
      success: false,
      message: "First name cannot be empty",
    });
  }

  if (lastName !== undefined && !lastName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Last name cannot be empty",
    });
  }

  next();
};

const validateUnsubscribeNewsletter = (req, res, next) => {
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Valid email is required",
    });
  }

  next();
};

const validateUpdateNewsletterSubscriber = (req, res, next) => {
  const { email, firstName, lastName, status } = req.body;

  if (email !== undefined && !validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Valid email is required",
    });
  }

  if (firstName !== undefined && !firstName.trim()) {
    return res.status(400).json({
      success: false,
      message: "First name cannot be empty",
    });
  }

  if (lastName !== undefined && !lastName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Last name cannot be empty",
    });
  }

  if (status && !["ACTIVE", "INACTIVE"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Subscriber status must be ACTIVE or INACTIVE",
    });
  }

  next();
};

module.exports = {
  validateSubscribeNewsletter,
  validateUnsubscribeNewsletter,
  validateUpdateNewsletterSubscriber,
};