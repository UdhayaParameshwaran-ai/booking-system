const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Name, email, and password are required" });
    }

    // Validate role (optional but good practice)
    const allowedRoles = ["admin", "provider", "customer"];
    const finalRole = allowedRoles.includes(role) ? role : "customer";

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with all fields
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: finalRole,
    });

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err); // helpful for debugging
    res
      .status(500)
      .json({ msg: "Error while registering", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: "Error while login", err });
  }
};

module.exports = { register, login };
