const Service = require("../models/Service");

const createService = async (req, res) => {
  try {
    const { name, duration, price, description } = req.body;
    const newService = await Service.create({
      name,
      duration,
      price,
      description,
      provider: req.user.id,
    });
    res.status(200).json({ msg: "Service created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error while creating service" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email");
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ msg: "Error while getting Services" });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: "Service not found" });

    if (service.provider.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Unauthorized to update this service" });
    }
    const updatedService = await Service.findByIdAndUpdate(req.params.id);
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ msg: "Error while updating Service" });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: "Service not found" });

    if (service.provider.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Unauthorized to delete this service" });
    }

    await service.deleteOne();
    res.status(200).json({ msg: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error while deleting service", error });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
