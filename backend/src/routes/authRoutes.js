const express = require("express");

const { login, profile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/login", login);
router.get("/profile", authMiddleware, roleMiddleware("ADMIN"), profile);

module.exports = router;
