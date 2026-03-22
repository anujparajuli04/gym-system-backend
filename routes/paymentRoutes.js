const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  createPayment,
  getMyPayments,
  updatePaymentStatus,
  getPricing,
  setPricing,
  sendPaymentWarning,
} = require("../controllers/paymentController");

router.get("/pricing", protect, getPricing);
router.post("/pricing", protect, authorizeRoles("admin"), setPricing);
router.post("/create", protect, authorizeRoles("admin"), createPayment);
router.get("/my", protect, getMyPayments);
router.put("/update/:id", protect, authorizeRoles("admin"), updatePaymentStatus);
router.post("/warning", protect, authorizeRoles("admin"), sendPaymentWarning);

module.exports = router;