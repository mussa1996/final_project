import Order from '../models/order';
require('dotenv').config();

//payment function using stripe

  
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.payment = async (req, res) => {
  let status, error;
  const { token, amount,userId,businessId} = req.body;
  const order = await Order.create({
    user: userId,
    business:businessId,
    cart: token,
    total_amount: amount,
    address: token.card.address_city,
    email: token.email,
    time_arrived: req.body.time_arrived,
    payment_status: "pending",
    payment_id: token.id,
  });
  const details = await order.save();
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) { 
    console.log(error); 
    status = 'Failure'; 
  }
  res.json({ error, status });
};
exports.getPayment = async (req, res) => {
  const payment = await Order.find().populate("user", "fullname").populate("business", "name");
  res.json(payment);
}
exports.getPaymentById = async (req, res) => {
  const payment = await Order.findById(req.query.id).populate("user", "fullname").populate("business", "name");
  res.json(payment);
}
exports.getPaymentByBusinessId = async (req, res) => {
  const payment = await Order.find({ business: req.query.id }).populate("user", "fullname").populate("business", "name");
  res.json(payment);
}
exports.getPaymentByUserId = async (req, res) => {
  const payment = await Order.find({ user: req.query.id }).populate("user", "fullname").populate("business", "name");
  res.json(payment);
}
exports.deletePayment = async (req, res) => {
  const payment = await Order.findByIdAndDelete(req.query.id);
  res.json(payment);
}
 
