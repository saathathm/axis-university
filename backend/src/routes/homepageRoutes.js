const express = require("express");

const {
  createHomepageContent,
  deleteHomepageContent,
  getActiveHomepageContent,
  getAllHomepageContent,
  getHomepageContentById,
  getHomepageContentByKey,
  updateHomepageContent,
} = require("../controllers/homepageController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { imageUpload, setUploadFolder } = require("../middleware/uploadMiddleware");
const {
  validateCreateHomepageContent,
  validateUpdateHomepageContent,
} = require("../validators/homepageValidator");

const router = express.Router();

const adminOnly = [authMiddleware, roleMiddleware("ADMIN")];
const homepageImageUpload = [setUploadFolder("homepage"), imageUpload.single("image")];

router.get("/", getActiveHomepageContent);
router.get("/admin", adminOnly, getAllHomepageContent);
router.get("/admin/:id", adminOnly, getHomepageContentById);
router.get("/:key", getHomepageContentByKey);
router.post("/", adminOnly, homepageImageUpload, validateCreateHomepageContent, createHomepageContent);
router.put(
  "/admin/:id",
  adminOnly,
  homepageImageUpload,
  validateUpdateHomepageContent,
  updateHomepageContent
);
router.delete("/admin/:id", adminOnly, deleteHomepageContent);

module.exports = router;