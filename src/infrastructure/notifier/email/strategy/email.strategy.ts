import { NotifyRequestDto } from "src/adapters/request/notification.request.dto";
import { EmailServiceInterface } from "src/data/protocols/notifier/email/email.interface";
import { NotifierStrategy } from "src/data/protocols/notifier/notifyStrategy.interface";

export default class EmailNotifierStrategy implements NotifierStrategy {
    constructor(private emailService: EmailServiceInterface) { }
  
    async notify(notificationData: NotifyRequestDto): Promise<void> {
      await this.emailService.send(
        notificationData.recipients,
        notificationData.subject,
        notificationData.message
      );
    }
  }