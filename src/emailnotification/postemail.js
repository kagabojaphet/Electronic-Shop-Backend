
import nodemailer from "nodemailer"

const sendEmail=async(alluserInf)=>{
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
        subject:`${alluserInf.firstName} New product posted`,
        html: `<p>Dear, <b>${alluserInf.firstName} ${alluserInf.lastName}</b></p><br/><br/> 
    <p>there is new new product posted go to buy it</p><br/><br/>
    <p>click the link <a href="https://gfj-electronic-shop.vercel.app/">to vist our website</a></p>`,
    }
    transporter.sendMail(maiOptions,function(err,info){
        if(err){
            console.error(err)
        }else{
            console.info(info)
        }
    })
}
export default sendEmail
