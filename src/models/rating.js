import mongoose from "mongoose";
const ratingSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  business:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: true,
  },   
});
const Rating = mongoose.model("rating",ratingSchema);
module.exports = Rating;
