import mongoose from "mongoose";
const subtypeSchema = new mongoose.Schema({
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
const Subtype = mongoose.model("subtype", subtypeSchema);
export default Subtype;