const Payment = require("../models/Payment");
const Pricing = require("../models/Pricing");
const User = require("../models/User");

// GET pricing plans (public)
exports.getPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find();
    res.json({ pricing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SET pricing plans (admin only)
exports.setPricing = async (req, res) => {
  try {
    const { plan, price, description } = req.body;
    const pricing = await Pricing.findOneAndUpdate(
      { plan },
      { price, description },
      { upsert: true, new: true }
    );
    res.json({ message: "Pricing updated", pricing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE payment (admin)
exports.createPayment = async (req, res) => {
  try {
    const { user, amount, method, dueDate, plan } = req.body;

    const months = plan === "3_month" ? 3 : plan === "2_month" ? 2 : 1;
    const expiryDate = new Date(dueDate || Date.now());
    expiryDate.setMonth(expiryDate.getMonth() + months);

    const payment = await Payment.create({
      user,
      amount,
      method,
      dueDate,
      plan: plan || "1_month",
      expiryDate,
    });

    res.status(201).json({
      message: "Payment record created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET my payments (member)
exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    const now = new Date();
    const updatedPayments = payments.map((p) => {
      const obj = p.toObject();
      if (obj.expiryDate) {
        const diff = Math.ceil((new Date(obj.expiryDate) - now) / (1000 * 60 * 60 * 24));
        obj.daysRemaining = diff;
      }
      return obj;
    });

    res.json({
      message: "Payment history fetched",
      payments: updatedPayments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE payment status (admin)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status,
        paidAt: status === "paid" ? Date.now() : null,
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ message: "Payment status updated", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SEND payment warning to member (admin)
exports.sendPaymentWarning = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const Notification = require("../models/Notification");

    const notification = await Notification.create({
      title: "Payment Reminder",
      message: message || "Your membership payment is due. Please renew to continue access.",
      createdBy: req.user.id,
    });

    res.json({ message: "Payment warning sent", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};