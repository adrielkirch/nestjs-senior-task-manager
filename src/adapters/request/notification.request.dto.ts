import { IsString, IsOptional } from 'class-validator';

export class NotifyRequestDto {
    @IsString()
    message: string;

    @IsOptional() 
    @IsString()
    subject: string;

    @IsString()
    recipients: string[];    
}



