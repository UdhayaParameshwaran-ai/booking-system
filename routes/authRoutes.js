const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

//To register in post method
router.post("/register", register);

//To login in post method
router.post("/login", login);

module.exports = router;
