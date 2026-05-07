const express = require("express");

const {
  deleteApplication,
  getAllApplications,
  getApplicationById,
  rejectApplication,
  submitApplication,
  updateApplicationStatus,
  verifyApplication,
} = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { setUploadFolder, upload } = require("../middleware/uploadMiddleware");
const {
  validateApplicationStatus,
  validateCreateApplication,
} = require("../validators/applicationValidator");

const router = express.Router();

const protectedApplicationAccess = [authMiddleware, roleMiddleware("ADMIN")];
const applicationDocumentUpload = [
  setUploadFolder("applications"),
  upload.single("document"),
];

router.post(
  "/",
  applicationDocumentUpload,
  validateCreateApplication,
  submitApplication
);
router.get("/", protectedApplicationAccess, getAllApplications);
router.get("/:id", protectedApplicationAccess, getApplicationById);
router.put(
  "/:id/status",
  protectedApplicationAccess,
  validateApplicationStatus,
  updateApplicationStatus
);
router.put("/:id/verify", protectedApplicationAccess, verifyApplication);
router.put("/:id/reject", protectedApplicationAccess, rejectApplication);
router.delete("/:id", protectedApplicationAccess, deleteApplication);

module.exports = router;
