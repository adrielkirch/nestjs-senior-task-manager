import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({
        description: "The user's ID",
        example: "08afddc9-5b82-43ce-bcec-5187f319131"
    })
    id: string;

    @ApiProperty({
        description: "The user's ID",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMDhhZmRkYzktNWI4Mi00M2NlLWJjZWMtNTE4N2YzMTkxM2ZiIiwicm8sZSI6ImFkbWluIiwiaWF0IjoxNzE1MDgxNzIxff.Yg1H7cb5kYUuMUjL2HNXOmKJHheMoosi6yIxIXTdeq4"
    })
    token: string;
}

export class UserResponseDto {
    @ApiProperty({
        description: "The user's ID",
        example: "08afddc9-5b82-43ce-bcec-5187f319131"
    })
    id: string;

    @ApiProperty({
        description: "The user's first name",
        example: "John"
    })
    name: string;

    @ApiProperty({
        description: "The user's last name",
        example: "Doe"
    })
    surname: string;

    @ApiProperty({
        description: "The user's email",
        example: "john.doe@example.com"
    })
    email: string;

    @ApiProperty({
        description: "The timestamp when the user was created",
        example: "2024-05-08T12:00:00.000Z"
    })
    createdAt: Date;

    @ApiProperty({
        description: "The timestamp when the user was last updated",
        example: "2024-05-08T12:00:00.000Z"
    })
    updatedAt: Date;

    @ApiProperty({
        description: "The user's role",
        example: "admin"
    })
    role: string;
}
