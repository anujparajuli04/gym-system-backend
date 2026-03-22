const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      enum: ["1_month", "2_month", "3_month"],
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pricing", pricingSchema);