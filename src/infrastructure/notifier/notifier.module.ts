import { Module } from '@nestjs/common';
import { EmailServiceImpl } from './email/email';
import { Notifier } from './notifier';
import { SmsServiceImpl } from './sms/sms';
import { PushNotificationServiceImpl } from './push_notification/push.notification';

@Module({
    providers: [
        {
            provide: Notifier,
            useFactory: (emailService: EmailServiceImpl, smsService: SmsServiceImpl, pushNotificationService: PushNotificationServiceImpl) => {
                return Notifier.getInstance(emailService, smsService, pushNotificationService);
            },
            inject: [EmailServiceImpl],
        },
        EmailServiceImpl,
    ],
    exports: [Notifier],
})
export class NotifierModule { }
