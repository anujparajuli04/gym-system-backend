const DefaultWorkout = require("../models/DefaultWorkout");

exports.getDefaultWorkouts = async (req, res) => {
  try {
    const workouts = await DefaultWorkout.find().sort({ day: 1 });
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.setDefaultWorkout = async (req, res) => {
  try {
    const { day, title, description, exercises } = req.body;
    const workout = await DefaultWorkout.findOneAndUpdate(
      { day },
      { title, description, exercises },
      { upsert: true, new: true }
    );
    res.json({ message: `Day ${day} workout saved`, workout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDefaultWorkout = async (req, res) => {
  try {
    await DefaultWorkout.findOneAndDelete({ day: req.params.day });
    res.json({ message: "Default workout deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};