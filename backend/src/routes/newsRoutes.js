const express = require("express");

const {
  createNews,
  deleteNews,
  getActiveNews,
  getAllNews,
  getNewsById,
  getNewsBySlug,
  updateNews,
} = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { imageUpload, setUploadFolder } = require("../middleware/uploadMiddleware");
const { validateCreateNews, validateUpdateNews } = require("../validators/newsValidator");

const router = express.Router();

const adminOnly = [authMiddleware, roleMiddleware("ADMIN")];
const newsImageUpload = [setUploadFolder("news"), imageUpload.single("image")];

router.get("/", getActiveNews);
router.get("/admin", adminOnly, getAllNews);
router.get("/admin/:id", adminOnly, getNewsById);
router.get("/:slug", getNewsBySlug);
router.post("/", adminOnly, newsImageUpload, validateCreateNews, createNews);
router.put("/admin/:id", adminOnly, newsImageUpload, validateUpdateNews, updateNews);
router.delete("/admin/:id", adminOnly, deleteNews);

module.exports = router;