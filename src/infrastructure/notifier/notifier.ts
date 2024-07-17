import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailServiceInterface } from 'src/data/protocols/notifier/email/email.interface';
import { SmsServiceInterface } from 'src/data/protocols/notifier/sms/sms.interface';
import { PushNotificationServiceInterface } from 'src/data/protocols/notifier/push_notification/push.notification.interface';
import { NotifyRequestDto } from 'src/adapters/request/notification.request.dto';
import { EventEmitter } from 'events';
import { NotifierStrategy } from 'src/data/protocols/notifier/notifyStrategy.interface';
import EmailNotifierStrategy from './email/strategy/email.strategy';
import PushNotificationNotifierStrategy from './push_notification/strategy/push_notification.strategy';
import SmsNotifierStrategy from './sms/strategy/sms.strategy';


@Injectable()
export class NotifierService {
  private static instance: NotifierService;
  private eventEmitter: EventEmitter;
  private strategies: Map<string, NotifierStrategy>;

  private constructor(
    emailService: EmailServiceInterface,
    smsService: SmsServiceInterface,
    pushNotificationService: PushNotificationServiceInterface
  ) {
    this.strategies = new Map<string, NotifierStrategy>([
      ['email', new EmailNotifierStrategy(emailService)],
      ['sms', new SmsNotifierStrategy(smsService)],
      ['notification', new PushNotificationNotifierStrategy(pushNotificationService)]
    ]);
    this.eventEmitter = new EventEmitter();
  }

  static getInstance(
    emailService: EmailServiceInterface,
    smsService: SmsServiceInterface,
    pushNotificationService: PushNotificationServiceInterface
  ): NotifierService {
    if (!NotifierService.instance) {
      NotifierService.instance = new NotifierService(
        emailService,
        smsService,
        pushNotificationService
      );
    }
    return NotifierService.instance;
  }

  emitNotifyEvent(name: string): void {
    this.eventEmitter.emit('onNotify', name);
  }


  onNotify(eventName: string, notificationData: NotifyRequestDto): void {
    this.eventEmitter.on('onNotify', () => {
      this.notify(eventName, notificationData);
    });
  }

  async notify(
    eventName: string,
    notificationData: NotifyRequestDto
  ): Promise<void> {
    const strategy = this.strategies.get(eventName);
    if (!strategy) {
      throw new BadRequestException(
        `Unsupported notification type: ${eventName}`
      );
    }
    await strategy.notify(notificationData);
  }
}
