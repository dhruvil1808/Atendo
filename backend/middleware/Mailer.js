import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export default class Mailer {
  static async sendMail(to, subject, text) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        return info;
      }
    });
  }
}
