import { Injectable } from '@nestjs/common';
import { VariablesRequestDto } from 'src/adapters/shared/request/adapter.request.variable';
import { EmailServiceInterface } from './email.service.interface';

@Injectable()
export class EmailServiceImpl implements EmailServiceInterface {
    async sendEmail(recipients: string[], subject: string, html: string): Promise<void> {
        try {
          const transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false, 
            auth: {
              user: 'your_smtp_username',
              pass: 'your_smtp_password',
            },
          });

          await transporter.sendMail({
            from: 'your_email@example.com',
            to: recipients.join(','),
            subject: subject,
            html: html,
          });
        } catch (error) {
          throw new Error(`Error sending email: ${error.message}`);
        }
      }

  async sendEmailTemplate(recipients: string[], subject: string, template: string, variables: VariablesRequestDto): Promise<void> {
   
  }
}
