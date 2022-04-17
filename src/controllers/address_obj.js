import Address_obj from "../models/address_obj";
exports.create = async (req, res) => {
  try {
    const address_obj = new Address_obj({
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          street1: req.body.street1,
          street2: req.body.street2, 
          pincode: req.body.pincode,
      
    });

    const details = await address_obj.save();
    res.send({
      message: "address_obj saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getaddress_obj = async (req, res) => {
  await Address_obj.find().then((pro) => {
    res.send({
      message: "address_objs found are:",
      pro,
    });
  });
};

exports.getOneaddress_obj = async (req, res, next) => {
  try {
    const cust = await Address_obj.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "address_obj not found",
      });
    }
    res.send({
      message: "address_obj found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteaddress_obj = async (req, res) => {
  try {
    const cust = await Address_obj.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "address_obj not found",
      });
    }

    await address_obj.deleteOne({ _id: req.query.id });
    res.send({
      message: " address_obj deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateaddress_obj = async (req, res) => {
  
  const address_obj = new Address_obj({
    _id: req.query.id,
    city: req.bodycity,
    state: req.body.state,
    country: req.body.country,
    street1: req.body.street1,
    street2: req.body.street2, 
    pincode: req.body.pincode,

});

  Address_obj.updateOne({ _id: req.query.id }, address_obj)
    .then(() => {
      res.status(201).send({
        message: "address_obj updated successfully",
        address_obj,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
