import { Injectable } from '@nestjs/common';
import { SmsServiceInterface } from 'src/data/protocols/notifier/sms/sms.interface';
import twilio from 'twilio';

@Injectable()
export class SmsServiceImpl implements SmsServiceInterface {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async send(recipients: string[], message: string): Promise<void> {
    try {
      await Promise.all(
        recipients.map(async (recipient) => {
          await this.client.messages.create({
            body: message,
            to: recipient,
            from: process.env.TWILIO_PHONE_NUMBER,
          });
        }),
      );
    } catch (error) {
      throw new Error(`Error sending SMS: ${error.message}`);
    }
  }
}
