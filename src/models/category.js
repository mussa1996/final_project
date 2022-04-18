import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
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
const Category = mongoose.model("category", categorySchema);
export default Category;