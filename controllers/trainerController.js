const User = require("../models/User");
const Workout = require("../models/Workout");

// GET all members assigned to this trainer
exports.getMyMembers = async (req, res) => {
  try {
    const members = await User.find({
      assignedTrainer: req.user.id,
      role: "member",
    }).select("-password");

    res.json({
      message: "Your members fetched",
      count: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ASSIGN workout to a member
exports.assignWorkout = async (req, res) => {
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
      message: "Workout assigned successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all workouts created by this trainer
exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ createdBy: req.user.id }).populate(
      "assignedTo",
      "name email"
    );

    res.json({
      message: "Your workouts fetched",
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ASSIGN trainer to a member (admin only)
exports.assignTrainerToMember = async (req, res) => {
  try {
    const { memberId, trainerId } = req.body;

    const member = await User.findByIdAndUpdate(
      memberId,
      { assignedTrainer: trainerId },
      { new: true }
    ).select("-password");

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({
      message: "Trainer assigned to member successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};