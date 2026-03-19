const Notification = require("../models/Notification");

// CREATE notification (admin only)
exports.createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notification = await Notification.create({
      title,
      message,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Notification sent successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all notifications (any logged-in user)
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json({
      message: "Notifications fetched",
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// MARK notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { readBy: req.user.id } },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({
      message: "Marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};