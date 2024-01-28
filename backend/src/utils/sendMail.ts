import { createTransport, Transporter } from "nodemailer";

export const sendMail = async (email: string, subject: string, text: string) => {
    const transport: Transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '0', 465), // Assuming port is a number
        service: process.env.SMTP_SERVICE_NAME,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject,
        text
    });
};
