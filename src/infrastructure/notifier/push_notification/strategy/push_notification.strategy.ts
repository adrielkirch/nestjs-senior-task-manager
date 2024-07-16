import { NotifyRequestDto } from "src/adapters/request/notification.request.dto";
import { NotifierStrategy } from "src/data/protocols/notifier/notifyStrategy.interface";
import { PushNotificationServiceInterface } from "src/data/protocols/notifier/push_notification/push.notification.interface";

export default class PushNotificationNotifierStrategy implements NotifierStrategy {
    constructor(private pushNotificationService: PushNotificationServiceInterface) { }
  
    async notify(notificationData: NotifyRequestDto): Promise<void> {
      await this.pushNotificationService.send(notificationData.recipients, notificationData.message);
    }
  }
  