const express = require("express");

const {
  createClass,
  deleteClass,
  getAllClasses,
  getClassById,
  updateClass,
} = require("../controllers/classController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  validateCreateClass,
  validateUpdateClass,
} = require("../validators/classValidator");

const router = express.Router();

const adminOnly = [authMiddleware, roleMiddleware("ADMIN")];

router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.post("/", adminOnly, validateCreateClass, createClass);
router.put("/:id", adminOnly, validateUpdateClass, updateClass);
router.delete("/:id", adminOnly, deleteClass);

module.exports = router;
