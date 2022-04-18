import Subtype from "../models/subtype";
exports.create = async (req, res) => {
  try {
    const subtype = new Subtype({
      key: req.body.key,
      name:req.body.name
    });

    const details = await subtype.save();
    res.send({
      message: "subtype saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getsubtype = async (req, res) => {
  await Subtype.find().then((pro) => {
    res.send({
      message: "subtypes found are:",
      pro,
    });
  });
};

exports.getOnesubtype = async (req, res, next) => {
  try {
    const cust = await Subtype.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "subtype not found",
      });
    }
    res.send({
      message: "subtype found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deletesubtype = async (req, res) => {
  try {
    const cust = await Subtype.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "subtype not found",
      });
    }

    await Subtype.deleteOne({ _id: req.query.id });
    res.send({
      message: " subtype deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updatesubtype = async (req, res) => {
  const subtype = new Subtype({
    _id: req.query.id,
    key: req.body.key,
    name:req.body.name
  });

  Subtype.updateOne({ _id: req.query.id }, subtype)
    .then(() => {
      res.status(201).send({
        message: "subtype updated successfully",
        subtype,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
