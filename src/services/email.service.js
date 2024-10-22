import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

export const emailService = {
    async sendAlert(subject, body) {
        const transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: false,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.password
            }
        });

        await transporter.sendMail({
            from: config.smtp.user,
            to: config.alertRecipient,
            subject,
            text: body
        });
    }
};