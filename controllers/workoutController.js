const Workout = require("../models/Workout");

// CREATE workout (trainer/admin)
exports.createWorkout = async (req, res) => {
  try {
    const { title, description, exercises, assignedTo } = req.body;

    const workout = await Workout.create({
      title,
      description,
      exercises,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Workout created successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET my workouts (member)
exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ assignedTo: req.user.id });

    res.json({
      message: "Workouts fetched successfully",
      workouts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};