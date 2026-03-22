const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  getDefaultWorkouts,
  setDefaultWorkout,
  deleteDefaultWorkout,
} = require("../controllers/defaultWorkoutController");

router.get("/", protect, getDefaultWorkouts);
router.post("/", protect, authorizeRoles("admin"), setDefaultWorkout);
router.delete("/:day", protect, authorizeRoles("admin"), deleteDefaultWorkout);

module.exports = router;