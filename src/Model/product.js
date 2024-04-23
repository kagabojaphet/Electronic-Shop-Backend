import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
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
    productCategory:{
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
    productImage:{
        type:String,
        required:true
    },
    postDate:{
        type:Date,
        default:Date.now()
    }
})
const Product=mongoose.model("Product",productSchema)
export default Product