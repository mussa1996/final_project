import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      state: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100,
      },
      country: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      pincode: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100,
      },
      street1: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      street2: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100,
      },
});

const Address = mongoose.model("address", addressSchema);
export default Address;