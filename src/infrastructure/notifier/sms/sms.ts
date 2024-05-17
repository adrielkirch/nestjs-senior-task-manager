import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SmsServiceInterface } from 'src/data/protocols/notifier/sms/sms.interface';
import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from 'src/config';
@Injectable()
export class SmsServiceImpl implements SmsServiceInterface {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
    );
  }

  async send(recipients: string[], message: string): Promise<void> {
    try {
      await Promise.all(
        recipients.map(async (recipient) => {
          await this.client.messages.create({
            body: message,
            to: recipient,
            from: TWILIO_PHONE_NUMBER,
          });
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(`Error sending SMS: ${error.message}`);
    }
  }
}
