const express = require("express");

const {
  deleteSubscriber,
  getAllSubscribers,
  getSubscriberById,
  subscribe,
  unsubscribe,
  updateSubscriber,
} = require("../controllers/newsletterController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  validateSubscribeNewsletter,
  validateUnsubscribeNewsletter,
  validateUpdateNewsletterSubscriber,
} = require("../validators/newsletterValidator");

const router = express.Router();

const adminOnly = [authMiddleware, roleMiddleware("ADMIN")];

router.post("/subscribe", validateSubscribeNewsletter, subscribe);
router.post("/unsubscribe", validateUnsubscribeNewsletter, unsubscribe);
router.get("/admin", adminOnly, getAllSubscribers);
router.get("/admin/:id", adminOnly, getSubscriberById);
router.put("/admin/:id", adminOnly, validateUpdateNewsletterSubscriber, updateSubscriber);
router.delete("/admin/:id", adminOnly, deleteSubscriber);

module.exports = router;