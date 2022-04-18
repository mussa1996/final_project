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
  rating: {
    type: Number,
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
  rankings: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  website: {
    type: String,
    required: false,
    trim: true,
    maxlength: 1000,
  },
  timezone: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  latitude: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  longitude: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  class_type: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100,
  },
  num_reviews: {
    type: Number,
    required: false,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: 1000,
  },

  awards: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"awards",
    required:false 
  }],
  address_obj: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"address",
    required:false
  }
  ,
  category: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category",
    required:false
  }],
  internal_services: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"internal_services",
    required:false
  }],
  hours: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"hours",
    required:false
  },
  photo: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"photo",
    required:false
  },
  subcategory: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subcategory",
    required:false
  }],
  subtype: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subtype",
    required:false
  }]
  //   owner:{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "user",
  //     required: true,
  //   }
});
const Product = mongoose.model("product",productSchema);
module.exports = Product;
