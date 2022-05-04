import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express from 'express';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "efea199fef02dc",
      pass: "a9119fbb315f3e"
    }
  });


app.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
       
    });

    await transport.sendMail({
        from: 'Feedback Team <test@feedback.com>',
        to: 'Gustavo Vaz <gustavoti.net@gmail.com>',
        subject: 'New feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Feedback type: ${type}<p>`,
            `<p>Comment: ${comment}<p>`,
            `<div>`
        ].join('\n')
    })

    return res.status(201).json({ data: feedback });
});



app.listen(3333, () => {
    console.log('HTTP server running!');
});