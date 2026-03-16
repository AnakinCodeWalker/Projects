import nodemailer from "nodemailer"
import env from "../config/env.config.js"


const mailsender = async (email, title, body) => {

        console.log("mailtrap Sending mail to:", email)

        const transporter = nodemailer.createTransport({
            host: env.MAILTRAP_HOST,
            port: env.MAILTRAP_PORT,
            secure: false, // Use true for port 465, false for port 587
            auth: {
                user: env.MAILTRAP_USERNAME,
                pass: env.MAILTRAP_PASSWORD,
            },
        });

          const info = await transporter.sendMail({
         from: "StudyNotion",
         to: email,            
         subject: title,
         html: body
      })


        console.log("Information",info);
        return info

    } 
    


export default mailsender