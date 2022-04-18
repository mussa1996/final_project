import mongoose from "mongoose";
const internalServicesSchema = new mongoose.Schema({
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
const InternalServices = mongoose.model("internal_services", internalServicesSchema);
export default InternalServices;