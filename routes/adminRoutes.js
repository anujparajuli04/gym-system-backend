const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  getAllMembers,
  getAllPayments,
  getAllAttendance,
  getAllWorkouts,
  deleteMember,
} = require("../controllers/adminController");

// all routes here are admin only
router.get("/members", protect, authorizeRoles("admin"), getAllMembers);
router.get("/payments", protect, authorizeRoles("admin"), getAllPayments);
router.get("/attendance", protect, authorizeRoles("admin"), getAllAttendance);
router.get("/workouts", protect, authorizeRoles("admin"), getAllWorkouts);
router.delete("/member/:id", protect, authorizeRoles("admin"), deleteMember);

module.exports = router;