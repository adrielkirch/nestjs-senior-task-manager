export interface PushNotificationServiceInterface {
    send(recipients: string[],  message: string): Promise<void>;
}
