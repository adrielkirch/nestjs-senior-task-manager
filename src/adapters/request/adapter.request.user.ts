import { IsString, IsEmail } from 'class-validator';

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
