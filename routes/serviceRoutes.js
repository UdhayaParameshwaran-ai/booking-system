const express = require("express");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const { deepEqual } = require("assert");
const router = express.Router();

router.get("/", getAllServices);

router.post("/", verifyToken, authorizeRoles("provider"), createService);

router.put("/:id", verifyToken, authorizeRoles("provider"), updateService);

router.delete("/:id", verifyToken, authorizeRoles("provider"), deleteService);

module.exports = router;
