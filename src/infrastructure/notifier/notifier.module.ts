import { Module } from '@nestjs/common';
import { EmailServiceImpl } from 'src/infrastructure/notifier/email/email';
import { NotifierService } from 'src/infrastructure/notifier/notifier';
import { SmsServiceImpl } from 'src/infrastructure/notifier/sms/sms';
import { PushNotificationServiceImpl } from 'src/infrastructure/notifier/push_notification/push.notification';

@Module({
    providers: [
        {
            provide: NotifierService,
            useFactory: (emailService: EmailServiceImpl, smsService: SmsServiceImpl, pushNotificationService: PushNotificationServiceImpl) => {
                return NotifierService.getInstance(emailService, smsService, pushNotificationService);
            },
            inject: [EmailServiceImpl,SmsServiceImpl,PushNotificationServiceImpl],
        },
        EmailServiceImpl,
    ],
    exports: [NotifierService],
})
export class NotifierModule { }
