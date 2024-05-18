
import nodemailer from "nodemailer"

const notifyForSignup=async(alluserInf)=>{
    let transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.Email,
            pass:process.env.PASSWORD,
        }
    });
    let maiOptions={
        from:process.env.Email,
        to:alluserInf.email,
        subject:`${alluserInf.firstName} Now we have new vister of our website`,
        html: `<p>Dear, <b>${alluserInf.firstName} ${alluserInf.lastName}</b></p><br/><br/> 
    <p>We have new person added in user of our website</p><br/><br/>
    <p>click the link <a href="http:akazuba.com">Akazuba</a></p>`,
    }
    transporter.sendMail(maiOptions,function(err,info){
        if(err){
            console.error(err)
        }else{
            console.info(info)
        }
    })
}
export default notifyForSignup
