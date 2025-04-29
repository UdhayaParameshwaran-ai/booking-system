const Booking = require("../models/Booking");
const Service = require("../models/Service");

const createBooking = async (req, res) => {
  try {
    const { serviceId, date } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ msg: "Service not found" });
    const booking = await Booking.create({
      customer: req.user.id,
      provider: service.provider,
      service: serviceId,
      date,
    });
    res.status(201).json({ msg: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ msg: "Error while create Booking", error });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate("service")
      .populate("provider", "name email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Error while get the Bookings", error });
  }
};

const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user.id })
      .populate("service")
      .populate("customer", "name email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    if (booking.customer.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Unauthorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();
    res.status(200).json({ msg: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getProviderBookings,
  cancelBooking,
};
