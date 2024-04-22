import User from "../Model/user";
import errormessage from "../Utils/errorMessage";
import successmessage from "../Utils/successMessage";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

class UserController{
    static async postUser(req,res){
        try {
            const{firstName,lastName,email,phoneNumber,password,confirmPassword}=req.body
            if(phoneNumber.length !==10 || phoneNumber <10){
                return errormessage(res,401,`PhoneNumber length is 10, please check that!`)
            }else{
                if(req.body.password !== req.body.confirmPassword){
                    return errormessage(res,401,`Password and ConfrimPassword must be the same`)
                }
                else{
                    const hashPassword=bcrypt.hashSync(req.body.password,10)
                    const user=await User.create({firstName,lastName,email,phoneNumber,password:hashPassword})
                    if(!user){
                        return errormessage(res,401,`User Not Created`)
                    }
                    else{
                        return successmessage(res,201,`User Successfuly Created`,user)
                    }
                }
            }
            
        } catch (error) {
            return errormessage(res,401,`error: ${error}`)
        }
    }

    static async getAll(req,res){
        try {
            const user=await User.find()
            if(!user){
                return errormessage(res,401,`User Not Found`)
            }
            else{
                return successmessage(res,200,`User Successfuly ${user.length} Retrieved`,user)
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }

    static async login(req,res){
        try {
            const{password,email}=req.body
            const user=await User.findOne({email})
            if(!user){
                return errormessage(res,404,`Incorrect or Email Not Found`)
            }
            else{
                const passwordCompare=bcrypt.compareSync(password,user.password)
                if(!passwordCompare){
                    return errormessage(res,401,`Incorrect Password And Email`)
                }
                else{
                    const token=Jwt.sign({user:user},process.env.SECRET_KEY,{expiresIn:"1d"})
                    return successmessage(res,200,{token:token,data:{user}})
                }
            }
        } catch (error) {
            return errormessage(res,500,`error: ${error}`)
        }
    }
}
export default UserController