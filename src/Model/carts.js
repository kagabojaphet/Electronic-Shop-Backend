import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
          },
          quantity: Number
        }
      ],    
});
const Carts=mongoose.model("Carts",cartSchema)
export default Carts