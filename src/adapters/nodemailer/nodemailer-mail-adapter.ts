import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "efea199fef02dc",
      pass: "a9119fbb315f3e"
    }
  });


export class NodemailMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData){
        await transport.sendMail({
            from: 'Feedback Team <test@feedback.com>',
            to: 'Gustavo Vaz <gustavoti.net@gmail.com>',
            subject,
            html: body,
        })
    }
}