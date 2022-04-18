import mongoose  from "mongoose";
const awardsSchema = new mongoose.Schema({
    award_type: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      display_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      images: {
        type: String,
        required: false,
        trim: true,
        maxlength: 1000,
      },
      year: {
        type: Number,
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
const Awards=mongoose.model("awards",awardsSchema);
export default Awards;