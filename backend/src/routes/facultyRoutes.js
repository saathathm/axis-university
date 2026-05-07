const express = require("express");

const {
  createFaculty,
  deleteFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
} = require("../controllers/facultyController");
const { getCoursesByFaculty } = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  imageUpload,
  setUploadFolder,
} = require("../middleware/uploadMiddleware");
const {
  validateCreateFaculty,
  validateUpdateFaculty,
} = require("../validators/facultyValidator");

const router = express.Router();

const adminOnly = [authMiddleware, roleMiddleware("ADMIN")];
const facultyImageUpload = [
  setUploadFolder("faculties"),
  imageUpload.single("image"),
];

router.get("/", getAllFaculties);
router.get("/:facultyId/courses", getCoursesByFaculty);
router.get("/:id", getFacultyById);
router.post(
  "/",
  adminOnly,
  facultyImageUpload,
  validateCreateFaculty,
  createFaculty
);
router.put(
  "/:id",
  adminOnly,
  facultyImageUpload,
  validateUpdateFaculty,
  updateFaculty
);
router.delete("/:id", adminOnly, deleteFaculty);

module.exports = router;
