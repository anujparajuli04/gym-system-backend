const User = require("../models/User");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");
const Workout = require("../models/Workout");

// GET all users (members + trainers + admins)
exports.getAllMembers = async (req, res) => {
  try {
    const members = await User.find().select("-password");
    res.json({
      message: "All members fetched",
      count: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user", "name email");
    res.json({
      message: "All payments fetched",
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({
      message: "All attendance fetched",
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all workouts
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    res.json({
      message: "All workouts fetched",
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE member
exports.deleteMember = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// RESET password (admin only)
exports.resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Password reset successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};