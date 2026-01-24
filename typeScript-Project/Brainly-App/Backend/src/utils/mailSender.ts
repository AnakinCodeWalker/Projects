import nodemailer from  'nodemailer';
//  you have to mention the types  while loading the env variables
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST as string,
  port: Number(process.env.MAILTRAP_PORT),
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.MAILTRAP_USER as string,
    pass: process.env.MAILTRAP_PASSWORD as string
  },
});

export {transporter}