const express = require("express");

const {
  createTestimonial,
  deleteTestimonial,
  getActiveTestimonials,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
} = require("../controllers/testimonialController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  imageUpload,
  setUploadFolder,
} = require("../middleware/uploadMiddleware");
const {
  validateCreateTestimonial,
  validateUpdateTestimonial,
} = require("../validators/testimonialValidator");

const router = express.Router();

const protectedTestimonialAccess = [authMiddleware, roleMiddleware("ADMIN")];
const testimonialPhotoUpload = [
  setUploadFolder("testimonials"),
  imageUpload.single("photo"),
];

router.get("/", getActiveTestimonials);
router.get("/admin", protectedTestimonialAccess, getAllTestimonials);
router.get("/:id", protectedTestimonialAccess, getTestimonialById);
router.post(
  "/",
  protectedTestimonialAccess,
  testimonialPhotoUpload,
  validateCreateTestimonial,
  createTestimonial
);
router.put(
  "/:id",
  protectedTestimonialAccess,
  testimonialPhotoUpload,
  validateUpdateTestimonial,
  updateTestimonial
);
router.delete("/:id", protectedTestimonialAccess, deleteTestimonial);

module.exports = router;
