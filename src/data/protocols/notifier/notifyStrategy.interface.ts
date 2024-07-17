import { NotifyRequestDto } from "src/adapters/request/notification.request.dto";

export interface NotifierStrategy {
  notify(
    notificationData: NotifyRequestDto
  )
}