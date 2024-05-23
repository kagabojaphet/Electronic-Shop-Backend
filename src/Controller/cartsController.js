import express from "express";
import Cart from "../Model/carts"
import Product from "../Model/product";
import errormessage from "../Utils/errorMessage";
import successmessage from "../Utils/successMessage";
import { jwtDecode } from "jwt-decode";


class CartController{
    static async addToCart(req,res){
        try {
            const productId=req.params.id
            const user = req.user;
            if(productId.length !==24 || productId.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const product = await Product.findById(productId);
            if (!product) {
              return res.status(404).json({ error: 'Product not found' });
            }
            const cartItem = {
                productId: product._id,
                productName: product.productName,
                productTitle:product.productTitle,
                productPrice: product.productPrice,
                productImage: product.productImage,
                quantity: 1,
              };
              let cart = await Cart.findOne({ user: user._id });
              if (!cart) {
                cart = new Cart({
                  user: user._id,
                  products: [cartItem],
                  userInfo: { 
                    userName: user.userName, 
                    email: user.email, 
                    phoneNumber: user.phoneNumber 
                  } 
                });
              } else {
                const existingProduct = cart.products.find(item => item.productId.equals(productId));
                if (existingProduct) {
                  existingProduct.quantity++;
                } else {
                  cart.products.push(cartItem);
                }
              }
              await cart.save();
              res.status(200).json({ message: 'Product added to cart', cart });

        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async getAll(req,res){
        try {
            const cart=await Cart.find()
            if(!cart){
                return errormessage(res,401,`Product Nont found`)
            }
            else{
                return successmessage(res,200,`Product Successfuly ${cart.length} retrieved`,cart)
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async deleteAll(req,res,next){
        try {
            const cart=await Cart.deleteMany()
            if(!cart){
                return errormessage(res,401,`Product Not Deleted`)
            }
            else{
                return successmessage(res,200,`Product Successfuly Deleted`)
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

  static async getOne(req,res){
      try {
      const cart = await Cart.findOne({ user: req.user._id }).populate('products.productName');
      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }
      res.json(cart.products);
    } catch (error) {
      return errormessage(res,500,`error ${error}`)
    }
  }
}
export default CartController