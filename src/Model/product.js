import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    
    productImage:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productTitle:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDiscount:{
        type:Number,
        required:true
    },
    postDate:{
        type:Date,
        default:Date.now()
    }
})
const Product=mongoose.model("Product",productSchema)
export default Product