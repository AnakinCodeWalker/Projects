import nodemailer from "nodemailer"
import env from "../config/env.config.js"


const mailsender = async (email, title, body) => {

    try {
        const transporter = nodemailer.createTransport({
            host: env.MAILTRAP_HOST,
            port: env.MAILTRAP_PORT,
            secure: false, // Use true for port 465, false for port 587
            auth: {
                user: env.MAILTRAP_USERNAME,
                pass: env.MAILTRAP_PASSWORD,
            },
        });

        let info = await transporter.sendMail({
            from: `"Prince" <no-reply@example.com>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        console.log(info);
        return info

    } catch (error) {
        console.log("Error in sending mail");
        console.log(error.message);

    }
}

export default mailsender