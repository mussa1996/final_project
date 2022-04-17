import mongoose from "mongoose";
const subcategorySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
});
const Subcategory = mongoose.model("subcategory", subcategorySchema);
export default Subcategory;