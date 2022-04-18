import mongoose from "mongoose";
const internalServicesSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      business_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business",
        required: true,
      },
});
const InternalServices = mongoose.model("internal_services", internalServicesSchema);
export default InternalServices;