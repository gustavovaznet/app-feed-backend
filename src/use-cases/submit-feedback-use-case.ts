//SUBMIT FEEDBACK USE CASE

//IMPORTING
import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

//REQUEST
interface SubmitFeedbackUseCaseRequest{
    type: string,
    comment: string,
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const { type, comment, screenshot } = request;

        //VALIDATION
        if (!type) {
            throw new Error('Type is required!')
        }

        if (!comment) {
            throw new Error('Comment is required!')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format!')
        }

        //REPO
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        //MAIL
        await this.mailAdapter.sendMail({
            subject: 'New feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Feedback type: ${type}<p>`,
                `<p>Comment: ${comment}<p>`,
                `<div>`
            ].join('\n')
        })
    }
}
