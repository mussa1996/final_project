import Internal_services from "../models/internal_services";
exports.create = async (req, res) => {
  try {
    const internal_services = new Internal_services({
      name: req.body.name,
      business_id: req.business._id,
      
    });

    const details = await internal_services.save();
    res.send({
      message: "internal_services saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getinternal_services = async (req, res) => {
  await Internal_services.find().then((service) => {
    res.send({
      message: "internal_services found are:",
      service,
    });
  });
};

exports.getOneinternal_services = async (req, res, next) => {
  try {
    const service = await Internal_services.findOne({ _id: req.query.id });
    if (!service) {
      res.status(404).send({
        message: "internal_services not found",
      });
    }
    res.send({
      message: "internal_services found is:",
      service,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteinternal_services = async (req, res) => {
  try {
    const service = await Internal_services.findOne({ _id: req.query.id });
    if (!service) {
      res.send({
        message: "internal_services not found",
      });
    }

    await Internal_services.deleteOne({ _id: req.query.id });
    res.send({
      message: " internal_services deleted successful",
      service: service,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateinternal_services = async (req, res) => {
  const internal_services = new Internal_services({
    _id: req.query.id,
    name: req.body.name,
    
  });
  Internal_services.updateOne({ _id: req.query.id }, internal_services)
    .then(() => {
      res.status(201).send({
        message: "internal_services updated successfully",
        internal_services,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
