import { createTransport } from "nodemailer"
import { env } from "./env";

export const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: env.HOST_EMAIL_ADDRESS,
        pass: env.HOST_EMAIL_PASSWORD,
    },
});