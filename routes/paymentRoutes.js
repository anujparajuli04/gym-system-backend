const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  createPayment,
  getMyPayments,
  updatePaymentStatus,
} = require("../controllers/paymentController");

// only admin can create and update payments
router.post("/create", protect, authorizeRoles("admin"), createPayment);
router.get("/my", protect, getMyPayments);
router.put("/update/:id", protect, authorizeRoles("admin"), updatePaymentStatus);

module.exports = router;
