import Category from "../models/category";
exports.create = async (req, res) => {
  try {
    const category = new Category({
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
  await Category.find().then((category) => {
    res.send({
      message: "categorys found are:",
      category,
    });
  });
};

exports.getOnecategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.query.id });
    if (!category) {
      res.status(404).send({
        message: "category not found",
      });
    }
    res.send({
      message: "category found is:",
      category,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deletecategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.query.id });
    if (!category) {
      res.send({
        message: "category not found",
      });
    }

    await Category.deleteOne({ _id: req.query.id });
    res.send({
      message: " category deleted successful",
      category: category,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updatecategory = async (req, res) => {
  const category = new Category({
    _id: req.query.id,
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
