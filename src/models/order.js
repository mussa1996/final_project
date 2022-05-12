import mongoose  from "mongoose";
const orderSchema = new mongoose.Schema({
  
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business",
        },
      cart: {
          type:Object,
            required:true
      },
        total_amount: {
            type: Number,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        time_arrived: {
            type: Date,
            required: false,
        },
        payment_status: {
            type: String,
            required: false,
            default: "pending",
        },
        payment_id: {
            type: String,
            required: true,
        },
        payment_date: {
            type: Date,
            required: true,
            default: Date.now,
        },
 
});
const Order=mongoose.model("order",orderSchema);
export default Order;