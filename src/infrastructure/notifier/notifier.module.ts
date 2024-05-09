import { Module } from '@nestjs/common';
import { EmailServiceImpl } from 'src/infrastructure/notifier/email/email';
import { Notifier } from 'src/infrastructure/notifier/notifier';
import { SmsServiceImpl } from 'src/infrastructure/notifier/sms/sms';
import { PushNotificationServiceImpl } from 'src/infrastructure/notifier/push_notification/push.notification';

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
