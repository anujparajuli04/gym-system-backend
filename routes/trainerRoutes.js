const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  getMyMembers,
  assignWorkout,
  getMyWorkouts,
  assignTrainerToMember,
} = require("../controllers/trainerController");

// trainer routes
router.get("/members", protect, authorizeRoles("trainer"), getMyMembers);
router.post("/assign-workout", protect, authorizeRoles("trainer"), assignWorkout);
router.get("/workouts", protect, authorizeRoles("trainer"), getMyWorkouts);

// admin only — assign a trainer to a member
router.post("/assign-trainer", protect, authorizeRoles("admin"), assignTrainerToMember);

module.exports = router;