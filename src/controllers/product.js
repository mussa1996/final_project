import Product from "../models/product";
exports.create = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      rating: req.body.rating,
      price: req.body.price,
      price_level: req.body.price_level,
      rankings: req.body.rankings,
      address: req.body.address,
      phone: req.body.phone,
      website: req.body.website,
      timezone: req.body.timezone,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      class_type: req.body.class_type,
      num_reviews: req.body.num_reviews,
      email: req.body.email,
      description: req.body.description,
      awards: req.body.awards,
      address_obj: req.body.address_obj,
      category: req.body.category,
      internal_services: req.body.internal_services,
      hours: req.body.hours,
      photo: req.body.photo,
      subcategory: req.body.subcategory,
      subtype: req.body.subtype
    });

    const details = await product.save();
    res.send({
      message: "Product saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getProduct = async (req, res) => {
  await Product.find().then((pro) => {
    res.send({
      message: "Products found are:",
      pro,
    });
  });
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const cust = await Product.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "Product not found",
      });
    }
    res.send({
      message: "Product found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const cust = await Product.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "Product not found",
      });
    }

    await Product.deleteOne({ _id: req.query.id });
    res.send({
      message: " Product deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  const product = new Product({
    _id: req.query.id,
    name: req.body.name,
    rating: req.body.rating,
    price: req.body.price,
    price_level: req.body.price_level,
    rankings: req.body.rankings,
    address: req.body.address,
    phone: req.body.phone,
    website: req.body.website,
    timezone: req.body.timezone,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    class_type: req.body.class_type,
    num_reviews: req.body.num_reviews,
    email: req.body.email,
    description: req.body.description,
    awards: req.body.awards,
    address_obj: req.body.address_obj,
    category: req.body.category,
    internal_services: req.body.internal_services,
    hours: req.body.hours,
    photo: req.body.photo,
    subcategory: req.body.subcategory,
    subtype: req.body.subtype
  });

  Product.updateOne({ _id: req.query.id }, product)
    .then(() => {
      res.status(201).send({
        message: "Product updated successfully",
        product,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
