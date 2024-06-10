import FormData from "form-data"
import config from 'config';
import axios from 'axios';
import * as https from 'https';
import * as fs from 'fs';
import nodemailer from 'nodemailer';

export const sendEmail = async (
    to: string,
    from: string,
    subject: string,
    text: string
) => {
    try {


        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ronny94@ethereal.email',
                pass: 'vChs37ufCQwyDQnh1s'
            },
            sendEmail
        });

        const mailOptions = {
            from: '<ronny94@ethereal.email>',
            to: to,
            subject: subject,
            text: text,
            html: '<p><b>Hello</b> to myself!</p>'
        };

        // // Send the email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });
    }
    catch (e) {
        console.log("error", e);
    }
}

// const readTemplate = (templatePath: string, variables: Record<string, any>): string => {
//     let template = fs.readFileSync(templatePath, 'utf8');

//     // Replace variables in the template
//     Object.keys(variables).forEach((key) => {
//         const regex = new RegExp(`{{${key}}}`, 'g');
//         template = template.replace(regex, variables[key]);
//     });

//     return template;
// };