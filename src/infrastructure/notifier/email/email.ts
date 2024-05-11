import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailServiceInterface } from 'src/data/protocols/notifier/email/email.interface';
import nodemailer, { Transporter } from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER_NAME, SMTP_PASSWORD } from 'src/config';

@Injectable()
export class EmailServiceImpl implements EmailServiceInterface {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER_NAME,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async send(recipients: string[], subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: SMTP_USER_NAME,
        to: recipients.join(','),
        subject: subject,
        html: html,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error sending email: ${error.message}`);
    }
  }
}
