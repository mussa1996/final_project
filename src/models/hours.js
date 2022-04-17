import mongoose from "mongoose";
const hoursSchema = new mongoose.Schema({
    timezone: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      week_ranges:{
          type:mongoose.Schema.Types.ObjectId,
            ref:"week_ranges"
        },
      
});
const Hours = mongoose.model("hours", hoursSchema);
export default Hours;