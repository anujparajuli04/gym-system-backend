const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { createWorkout, getMyWorkouts } = require("../controllers/workoutController");

// only trainer or admin can create workouts
router.post("/create", protect, authorizeRoles("trainer", "admin"), createWorkout);

// any logged-in member can view their workouts
router.get("/my", protect, getMyWorkouts);

module.exports = router;