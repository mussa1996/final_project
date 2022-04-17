import mongoose from "mongoose";
const photoSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      helpfulvotes: {
        type: Number,
        required: false,
        trim: true,
        maxlength: 100,
      },
      published_date: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      uploaded_date: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      images:[{
          type:mongoose.Schema.Types.ObjectId,
            ref:"images"
        }],
      
      user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
});
const Photo = mongoose.model("photo", photoSchema);
export default Photo;