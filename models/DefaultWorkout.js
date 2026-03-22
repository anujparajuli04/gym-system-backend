const mongoose = require("mongoose");

const defaultWorkoutSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number },
        reps: { type: Number },
        duration: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DefaultWorkout", defaultWorkoutSchema);