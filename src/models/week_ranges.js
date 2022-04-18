import mongoose from "mongoose";
const weekRangesSchema = new mongoose.Schema({
    opentime: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      closetime: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 10,
      },
});
const WeekRanges = mongoose.model("week_ranges", weekRangesSchema);
export default WeekRanges;