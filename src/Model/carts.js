import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  firstName:String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: String,
  productPrice: Number,
  productImage: String,
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [cartItemSchema],
  userInfo: {
    email: String,
    phoneNumber: String,
  },
});

const Cart= mongoose.model('Cart', cartSchema);
export default Cart