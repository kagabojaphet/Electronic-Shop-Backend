import Product from "../Model/product";
import errormessage from "../Utils/errorMessage";
import successmessage from "../Utils/successMessage";
import sendEmail from "../emailnotification/postemail";
import User from "../Model/user";

class ProductController{
    static async postProduct(req,res){
        try {
            const{productName,productTitle,productDescription,productCategory,productPrice,productDiscount}=req.body
            const productImage = req.file ? req.file.path : null;
            const product=await Product.create({productName,productTitle,productDescription,productCategory,productPrice,productDiscount,productImage})
            if(!product){
                return errormessage(res,401,`Product Not Posted`)
            }
            else{

                const users =await User.find()
                         users.map((usere)=>{
                            sendEmail(usere,product)
                     })
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

    static async searchProduct(req,res){
        
        try {
            const searchCategory = req.query.category;
            if (!searchCategory) {
                return errormessage(res, 401, 'No category provided in query');
            }

            // Use MongoDB query to find products by category
            const products = await Product.find({
                productCategory: { $regex: new RegExp(searchCategory, 'i') }
            });

            if (products.length === 0) {
                return errormessage(res, 401, 'No product found');
            } else {
                return successmessage(res, 200, `${products.length} products found for category ${searchCategory}`, products);
            }
        } catch (error) {
            return errormessage(res, 500, `${error.message}`);
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

    static async searchmethod(req,res){
        console.log("ghfbiujlijkbhjvfgx")
    }

    // static async searchProductByCategory(req, res) {
    //     console.log("gtuyhjoijoihgtwaychtc")
    //     try {
    //         const searchCategory = req.query.category;
    //         if (!searchCategory) {
    //             return errormessage(res, 401, 'No category provided in query');
    //         }

    //         // Use MongoDB query to find products by category
    //         const products = await Product.find({
    //             productCategory: { $regex: new RegExp(searchCategory, 'i') }
    //         });

    //         if (products.length === 0) {
    //             return errormessage(res, 401, 'No product found');
    //         } else {
    //             return successmessage(res, 200, `${products.length} products found for category ${searchCategory}`, products);
    //         }
    //     } catch (error) {
    //         return errormessage(res, 500, `${error.message}`);
    //     }
    // }
}
export default ProductController