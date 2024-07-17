import { Module } from '@nestjs/common';
import { EmailServiceImpl } from './email/service/email.service'; 
import { NotifierService } from './notifier'; 
import { SmsServiceImpl } from './sms/service/sms.service'; 
import { PushNotificationServiceImpl } from './push_notification/service/push_notification.service'; 

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
