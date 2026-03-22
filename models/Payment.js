const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
      enum: ["1_month", "2_month", "3_month"],
      default: "1_month",
    },
    status: {
      type: String,
      enum: ["paid", "unpaid", "pending"],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["cash", "card", "online"],
      default: "cash",
    },
    dueDate: {
      type: Date,
    },
    paidAt: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    daysRemaining: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);