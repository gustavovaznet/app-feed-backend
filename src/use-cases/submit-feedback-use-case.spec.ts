import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('Should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,aaaaaaaaaaaaaaaaaaa.jpg',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

    })
});

describe('Submit feedback', () => {
    it('Should not be able to submit a feedback without a specific type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,aaaaaaaaaaaaaaaaaaa.jpg',
        })).rejects.toThrow();
    })
});

describe('Submit feedback', () => {
    it('Should not be able to submit a feedback without a comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,aaaaaaaaaaaaaaaaaaa.jpg',
        })).rejects.toThrow();
    })
});

describe('Submit feedback', () => {
    it('Should not be able to submit a feedback without a valid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: '123.png',
        })).rejects.toThrow();
    })
});