import e from "express";
import Carts from "../Model/carts";
import Product from "../Model/product";
import errormessage from "../Utils/errorMessage";
import successmessage from "../Utils/successMessage";


class CartController{
    static async addToCart(req,res){
        try {
            const productId=req.params.id
            const {userId}=req.body
            if(productId.length !==24 || productId.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const product=await Product.findById(productId);
            if(!product){
                return errormessage(res,404,`Product Not Found`)
            }
            
                let cart=await Carts.findOne({userId});
                if(!cart){
                    cart =new Carts({userId,products:[]});
                }
                const existingProductIndex=cart.products.findIndex(item => String(item.productId)===productId);
                if(existingProductIndex !== -1){
                    cart.products[existingProductIndex].quantity ++;
                }
                else{
                    cart.products.push({productId,quantity: 1});
                }
                await cart.save()
                return successmessage(res,200,`success`,cart)

        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async getAll(req,res){
        try {
            const cart=await Carts.find()
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
}
export default CartController