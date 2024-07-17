import { NotifyRequestDto } from "src/adapters/request/notification.request.dto";
import { NotifierStrategy } from "src/data/protocols/notifier/notifyStrategy.interface";
import { SmsServiceInterface } from "src/data/protocols/notifier/sms/sms.interface";

export default class SmsNotifierStrategy implements NotifierStrategy {
  constructor(private smsService: SmsServiceInterface) { }

  async notify(notificationData: NotifyRequestDto): Promise<void> {
    await this.smsService.send(notificationData.recipients, notificationData.message);
  }
}
