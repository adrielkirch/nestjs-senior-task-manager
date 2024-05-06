
export interface PushNotificationServiceInterface {
    send(recipients: string[], data:any, message: string): Promise<void>;
}
