import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodeMailerAdapter = new NodemailMailAdapter()
    
    const submitFeedbackUseUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodeMailerAdapter,
    );

    await submitFeedbackUseUseCase.execute({
        type,
        comment,
        screenshot,
    })

    return res.status(201).send();
});
