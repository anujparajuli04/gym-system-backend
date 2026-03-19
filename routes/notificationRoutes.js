const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  createNotification,
  getAllNotifications,
  markAsRead,
} = require("../controllers/notificationController");

// admin only can create
router.post("/create", protect, authorizeRoles("admin"), createNotification);

// any logged-in user can view
router.get("/all", protect, getAllNotifications);

// any logged-in user can mark as read
router.put("/read/:id", protect, markAsRead);

module.exports = router;