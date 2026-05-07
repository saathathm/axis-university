const express = require("express");

const {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} = require("../controllers/courseController");
const { getClassesByCourse } = require("../controllers/classController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  imageUpload,
  setUploadFolder,
} = require("../middleware/uploadMiddleware");
const {
  validateCreateCourse,
  validateUpdateCourse,
} = require("../validators/courseValidator");

const router = express.Router();

const adminOnly = [authMiddleware, roleMiddleware("ADMIN")];
const courseImageUpload = [
  setUploadFolder("courses"),
  imageUpload.single("image"),
];

router.get("/", getAllCourses);
router.get("/:courseId/classes", getClassesByCourse);
router.get("/:id", getCourseById);
router.post("/", adminOnly, courseImageUpload, validateCreateCourse, createCourse);
router.put(
  "/:id",
  adminOnly,
  courseImageUpload,
  validateUpdateCourse,
  updateCourse
);
router.delete("/:id", adminOnly, deleteCourse);

module.exports = router;
