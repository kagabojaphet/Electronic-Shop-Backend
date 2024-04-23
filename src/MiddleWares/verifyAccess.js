import errormessage from "../Utils/errorMessage";
import Jwt,{ JsonWebTokenError } from "jsonwebtoken";

const verifyAccess=(passRole)=>{
    return(req,res,next)=>{
        const token=req.headers["electronic"]
        if(!token){
            return errormessage(res,401,`No Token Provided`)
        }
        else{
            try {
                const verifyToken=Jwt.verify(token,process.env.SECRET_KEY,{expiresIn:"1d"})
                req.user=verifyToken.user
                if(passRole!==verifyToken.user.role){
                    return errormessage(res,401,`You Don't have Access`)
                }
                else{
                    return next()
                }
            } catch (error) {
                if(error =JsonWebTokenError){
                    return errormessage(res,401,`Invalid Token`)
                }
                else{
                    return errormessage(res,500,`error: ${error}`)
                }
            }
        }
    }
}
export default verifyAccess