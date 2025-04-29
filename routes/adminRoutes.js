const express = require("express");
const {
  getAllUsers,
  deleteUser,
  getAnalytics,
} = require("../controllers/adminController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

// @route   GET /api/admin/users
router.get("/users", verifyToken, authorizeRoles("admin"), getAllUsers);

// @route   DELETE /api/admin/user/:id
router.delete("/user/:id", verifyToken, authorizeRoles("admin"), deleteUser);

// @route   GET /api/admin/analytics
router.get("/analytics", verifyToken, authorizeRoles("admin"), getAnalytics);

module.exports = router;
