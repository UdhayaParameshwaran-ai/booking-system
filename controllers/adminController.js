const User = require("../models/User");
const Booking = require("../models/Booking");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await user.deleteOne();
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    res.status(200).json({ totalUsers, totalBookings });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

module.exports = { getAllUsers, deleteUser, getAnalytics };
