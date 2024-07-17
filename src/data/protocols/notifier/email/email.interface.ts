
export interface EmailServiceInterface {
    send(recipients: string[], subject: string, html: string): Promise<void>;
}

