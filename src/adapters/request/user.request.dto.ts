import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginRequestDto {
    @ApiProperty({
        description: "The user's email address",
        example: "john@example.com"
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: "The user's password",
        example: "P@ssw0rd123"
    })
    @IsString()
    password: string;
}

export class CreateRequestUserDto {
    @ApiProperty({
        description: "The user's first name",
        example: "John"
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "The user's last name",
        example: "Doe"
    })
    @IsString()
    surname: string;

    @ApiProperty({
        description: "The user's email address",
        example: "user@example.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "The user's password",
        example: "P@ssw0rd123"
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: "The user's updated role",
        example: "admin"
    })
    @IsOptional()
    @IsString()
    role: string = 'guest';
}

export class UpdateRequestUserDto {
    @ApiProperty({
        description: "The unique identifier of the user",
        example: "08afddc9-5b82-43ce-bcec-5187f31913a"
    })
    @IsOptional()
    @IsString()
    id: string;

    @ApiProperty({
        description: "The user's updated first name",
        example: "John"
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: "The user's updated last name",
        example: "Doe"
    })
    @IsOptional()
    @IsString()
    surname?: string;

    @ApiProperty({
        description: "The user's updated role",
        example: "admin"
    })
    @IsOptional()
    @IsString()
    role?: string = 'guest';

    @ApiProperty({
        description: "The user's updated password",
        example: "NewP@ssw0rd123"
    })
    @IsOptional()
    @IsString()
    password?: string;
}
