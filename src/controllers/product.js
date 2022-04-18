import Product from "../models/product";
import uploader from "../helper/storage";
exports.create = async (req, res) => {
  try {
    const images=req.files.photo;
    const response=await uploader(images.tempFilePath)
    console.log("images path",response)
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      price_level: req.body.price_level,
      photo:response.secure_url,
      business_id: req.business._id,
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
  await Product.find().then((product) => {
    res.send({
      message: "Products found are:",
      product,
    });
  });
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.query.id });
    if (!product) {
      res.status(404).send({
        message: "Product not found",
      });
    }
    res.send({
      message: "Product found is:",
      product,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.query.id });
    if (!product) {
      res.send({
        message: "Product not found",
      });
    }

    await Product.deleteOne({ _id: req.query.id });
    res.send({
      message: " Product deleted successful",
      product: product,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  const images=req.files.photo;
  const response=await uploader(images.tempFilePath)
  console.log("images path",response)
  const product = new Product({
    _id: req.query.id,
    name: req.body.name,
    price: req.body.price,
    price_level: req.body.price_level,
    photo:response.secure_url,
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
