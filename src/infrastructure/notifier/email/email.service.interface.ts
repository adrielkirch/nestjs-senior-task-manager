import { VariablesRequestDto } from "src/adapters/shared/request/adapter.request.variable";

export interface EmailServiceInterface {
    sendEmail(recipients: string[], subject: string, html: string): Promise<void>;
    sendEmailTemplate(recipients: string[], subject: string, template: string, variables: VariablesRequestDto): Promise<void>;
}
  