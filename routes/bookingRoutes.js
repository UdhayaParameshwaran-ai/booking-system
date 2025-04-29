const express = require("express");
const {
  createBooking,
  getMyBookings,
  getProviderBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

// @route   POST /api/bookings
router.post("/", verifyToken, authorizeRoles("customer"), createBooking);

// @route   GET /api/bookings/my
router.get("/my", verifyToken, authorizeRoles("customer"), getMyBookings);

// @route   GET /api/bookings/provider
router.get(
  "/provider",
  verifyToken,
  authorizeRoles("provider"),
  getProviderBookings
);

// @route   PATCH /api/bookings/:id/cancel
router.patch("/:id/cancel", verifyToken, cancelBooking);

module.exports = router;
