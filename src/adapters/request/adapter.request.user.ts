import { IsString, IsEmail, IsOptional } from 'class-validator';

export type LoginRequestDto = {
    email: string;
    password: string;
};

export class CreateRequestUserDto {
    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class UpdateRequestUserDto {
    @IsOptional() 
    @IsString()
    id: string;

    @IsOptional() 
    @IsString()
    name?: string;

    @IsOptional() 
    @IsString()
    surname?: string;

    @IsOptional() 
    @IsString()
    role?: string = 'guest';

    @IsOptional() 
    @IsString()
    password?: string;
}
