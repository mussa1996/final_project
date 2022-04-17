import Subcategory from "../models/subcategory";
exports.create = async (req, res) => {
  try {
    const subcategory = new Subcategory({
      key: req.body.key,
      name: req.body.name,
    });

    const details = await subcategory.save();
    res.send({
      message: "subcategory saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getsubcategory = async (req, res) => {
  await Subcategory.find().then((pro) => {
    res.send({
      message: "subcategorys found are:",
      pro,
    });
  });
};

exports.getOnesubcategory = async (req, res, next) => {
  try {
    const cust = await Subcategory.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "subcategory not found",
      });
    }
    res.send({
      message: "subcategory found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deletesubcategory = async (req, res) => {
  try {
    const cust = await Subcategory.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "subcategory not found",
      });
    }

    await Subcategory.deleteOne({ _id: req.query.id });
    res.send({
      message: " subcategory deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updatesubcategory = async (req, res) => {
  const subcategory = new Subcategory({
    _id: req.query.id,
    key: req.body.key,
    name: req.body.name,
  });

  Subcategory.updateOne({ _id: req.query.id }, subcategory)
    .then(() => {
      res.status(201).send({
        message: "subcategory updated successfully",
        subcategory,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
