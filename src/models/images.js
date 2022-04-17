import mongoose from "mongoose";
const imagesSchema = new mongoose.Schema({
    height: {
        type: Number,
        required: false,
        default: "367",
      },
      width: {
        type: Number,
        required: true,
        default: "550",
      },
    url: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
        },
        
});
const Images = mongoose.model("images", imagesSchema);
export default Images;