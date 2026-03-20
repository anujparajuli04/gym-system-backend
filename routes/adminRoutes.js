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
  resetPassword,
} = require("../controllers/adminController");

router.get("/members", protect, authorizeRoles("admin"), getAllMembers);
router.get("/payments", protect, authorizeRoles("admin"), getAllPayments);
router.get("/attendance", protect, authorizeRoles("admin"), getAllAttendance);
router.get("/workouts", protect, authorizeRoles("admin"), getAllWorkouts);
router.delete("/member/:id", protect, authorizeRoles("admin"), deleteMember);
router.put("/reset-password", protect, authorizeRoles("admin"), resetPassword);

module.exports = router;