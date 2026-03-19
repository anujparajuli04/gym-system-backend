const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  checkIn,
  checkOut,
  getMyAttendance,
} = require("../controllers/attendanceController");

router.post("/checkin", protect, checkIn);
router.put("/checkout", protect, checkOut);
router.get("/my", protect, getMyAttendance);

module.exports = router;