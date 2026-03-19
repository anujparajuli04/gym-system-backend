const Attendance = require("../models/Attendance");

// CHECK IN
exports.checkIn = async (req, res) => {
  try {
    const attendance = await Attendance.create({
      user: req.user.id,
    });

    res.status(201).json({
      message: "Check-in successful ✅",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CHECK OUT
exports.checkOut = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { user: req.user.id, checkOut: null },
      { checkOut: Date.now() },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "No active check-in found" });
    }

    res.json({
      message: "Check-out successful 👋",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MY ATTENDANCE HISTORY
exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      message: "Attendance history fetched",
      records,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
