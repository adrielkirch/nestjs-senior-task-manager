import { IsString, IsOptional } from 'class-validator';

export class CreateRequestTaskDto {
    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsOptional() 
    @IsString()
    userId?: string;

    @IsOptional() 
    @IsString()
    expirationDate?: string;

    @IsOptional() 
    @IsString()
    remindDate?: string;

    @IsOptional()
    @IsString()
    assignTo?: string;
}
