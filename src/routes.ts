import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "efea199fef02dc",
      pass: "a9119fbb315f3e"
    }
  });


routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository
    )

    await submitFeedbackUseUseCase.execute({
        type,
        comment,
        screenshot,
    })

    /*await transport.sendMail({
        from: 'Feedback Team <test@feedback.com>',
        to: 'Gustavo Vaz <gustavoti.net@gmail.com>',
        subject: 'New feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Feedback type: ${type}<p>`,
            `<p>Comment: ${comment}<p>`,
            `<div>`
        ].join('\n')
    })*/

    return res.status(201).send();
});