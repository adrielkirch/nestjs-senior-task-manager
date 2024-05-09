import { Injectable } from '@nestjs/common';
import { EmailServiceInterface } from 'src/data/protocols/notifier/email/email.interface';
import { SmsServiceInterface } from 'src/data/protocols/notifier/sms/sms.interface';
import { PushNotificationServiceInterface } from 'src/data/protocols/notifier/push_notification/push.notification.interface';
import { NotifyRequestDto } from 'src/adapters/request/notification.request.dto';

@Injectable()
export class Notifier {
    private static instance: Notifier;
    private emailService: EmailServiceInterface;
    private smsService: SmsServiceInterface;
    private pushNotificationService: PushNotificationServiceInterface;

    private constructor(
        emailService: EmailServiceInterface,
        smsService: SmsServiceInterface,
        pushNotificationService: PushNotificationServiceInterface
    ) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.pushNotificationService = pushNotificationService;
    }

    static getInstance(
        emailService: EmailServiceInterface,
        smsService: SmsServiceInterface,
        pushNotificationService: PushNotificationServiceInterface
    ): Notifier {
        if (!Notifier.instance) {
            Notifier.instance = new Notifier(emailService, smsService, pushNotificationService);
        }
        return Notifier.instance;
    }

    async notify(deliveryMethod: string, notificationData: NotifyRequestDto): Promise<void> {
        switch (deliveryMethod) {
            case 'email':
                await this.sendEmail(notificationData.recipients, notificationData.subject, notificationData.message);
                break;
            case 'sms':
                await this.sendSms(notificationData.recipients, notificationData.message);
                break;
            case 'notification':
                await this.sendPushNotification(notificationData.recipients, notificationData.message);
                break;
            default:
                throw new Error(`Unsupported notification type: ${deliveryMethod}`);
        }
    }

    private async sendEmail(recipients: string[], subject: string, message: string): Promise<void> {
        await this.emailService.send(recipients, subject, message);
    }
    
    private async sendSms(recipients: string[], message: string): Promise<void> {
        await this.smsService.send(recipients, message);
    }
    
    private async sendPushNotification(recipients: string[], message: string): Promise<void> {
        await this.pushNotificationService.send(recipients, message);
    }
}
