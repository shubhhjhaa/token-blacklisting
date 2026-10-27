import nodemailer from "nodemailer";
import config from "../config/config";

async function sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.EMAIL,
            pass: config.EMAIL_PASS
        }
    });

    const mailOptions = {
        from:config.EMAIL,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;
