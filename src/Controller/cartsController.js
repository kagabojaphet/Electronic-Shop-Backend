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
      const decodedtoken=req.headers['electronic']
      const userCart=jwtDecode(decodedtoken)
      const users=userCart.user._id
      const cart=await Cart.find()
      const carrtmap=cart.map((pro)=>{
        return(pro!==(user => user.user === users))
      })
      console.log(carrtmap)
      // const userId = req.user.userId;
      // const userCart = data.data.find(user => user.user === userId);
  
      // if (userCart) {
      //     res.json(userCart.products);
      // } else {
      //     res.status(404).send('User not found or no products in cart');
      // }

      // const idParams=req.params.id
      // if(idParams.length !== 24 || idParams.length <24){
      //   return errormessage(res,401,`Invalid ID`)
      // }
      // const cart=await Cart.findById(idParams)
      // if(!cart){
      //   return errormessage(res,404,`Cart Not Found`)
      // }
      // else{
      //   return successmessage(res,200,`Cart Successfuly Retrieved`,cart)
      // }
    } catch (error) {
      return errormessage(res,500,`error ${error}`)
    }
  }
}
export default CartController