import Product from "../Model/product";
import errormessage from "../Utils/errorMessage";
import successmessage from "../Utils/successMessage";

class ProductController{
    static async postProduct(req,res){
        try {
            const product=await Product.create(req.body)
            if(!product){
                return errormessage(res,401,`Product Not Posted`)
            }
            else{
                return successmessage(res,201,`Product successfuly Posted`,product)
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async getProduct(req,res){
        try {
            const product=await Product.find()
            if(!product){
                return errormessage(res,401,`Product Not Found`)
            }
            else{
                return successmessage(res,200,`All Product ${product.length} successfuly retrieved`,product)
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async delleteAllProduct(req,res){
        try {
            const product=await Product.deleteMany()
            if(!product){
                return errormessage(res,401,`Products Not Deleted`)
            }
            else{
                return successmessage(res,200,`Product Successfuly Deleted`)
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async getOneProduct(req,res){
        try {
            const idParams=req.params.id
            if(idParams.length !==24 || idParams.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const product=await Product.findById(idParams)
            if(!product){
                return errormessage(res,401,`Product with ID ${idParams} Not Found`)
            }
            else{
                return successmessage(res,200,`Product Successfuly Retrieved`,product)
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async DeleteOneProduct(req,res){
        try {
            const idParams=req.params.id
            if(idParams.length !==24 || idParams.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const product=await Product.findByIdAndDelete(idParams)
            if(!product){
                return errormessage(res,401,`Product with ID`)
            }
            else{
                return successmessage(res,200,`Product Successfuly Deleted`)
            }

        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async update(req,res){
        try {
            const idParams=req.params.id
            if(idParams.length !==24 || idParams.length <24){
                return errormessage(res,401,`Invalid ID`)
            }
            const product=await Product.findByIdAndUpdate(idParams,req.body,{new:true})
            if(!product){
                return errormessage(res,401,`Product with ID ${idParams} Not Found`,product)
            }
            else{
                return successmessage(res,200,`Product Successfuly Updated`,product)
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }
}
export default ProductController