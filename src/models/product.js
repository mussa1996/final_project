import mongoose from "mongoose";
import validator from "validator";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  price: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  price_level: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  photo: {
    type: String,
    required: true,
  },
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: true,
  },
});
const Product = mongoose.model("product",productSchema);
module.exports = Product;
