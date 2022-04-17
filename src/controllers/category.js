import Category from "../models/category";
exports.create = async (req, res) => {
  try {
    const category = new Category({
      key: req.body.key,
      name: req.body.name,

    });

    const details = await category.save();
    res.send({
      message: "category saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getcategory = async (req, res) => {
  await Category.find().then((pro) => {
    res.send({
      message: "categorys found are:",
      pro,
    });
  });
};

exports.getOnecategory = async (req, res, next) => {
  try {
    const cust = await Category.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "category not found",
      });
    }
    res.send({
      message: "category found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deletecategory = async (req, res) => {
  try {
    const cust = await Category.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "category not found",
      });
    }

    await Category.deleteOne({ _id: req.query.id });
    res.send({
      message: " category deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updatecategory = async (req, res) => {
  const category = new Category({
    _id: req.query.id,
    key: req.body.key,
    name: req.body.name,

  });

  Category.updateOne({ _id: req.query.id }, category)
    .then(() => {
      res.status(201).send({
        message: "category updated successfully",
        category,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
