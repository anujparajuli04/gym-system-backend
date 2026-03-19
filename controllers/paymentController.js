const Payment = require("../models/Payment");

// CREATE payment (admin)
exports.createPayment = async (req, res) => {
  try {
    const { user, amount, method, dueDate } = req.body;

    const payment = await Payment.create({
      user,
      amount,
      method,
      dueDate,
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
    const payments = await Payment.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      message: "Payment history fetched",
      payments,
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

    res.json({
      message: "Payment status updated",
      payment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};