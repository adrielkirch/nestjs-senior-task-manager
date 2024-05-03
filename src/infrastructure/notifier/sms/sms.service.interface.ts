
export interface SmsServiceInterface {
    send(recipients: string[], message: string): Promise<void>;
}
