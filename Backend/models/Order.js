import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,               // Customer full name
  email: String,
  mobile: String,
  age: String,
  address: String,
  productName: String,
  productQuantity: Number,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);


