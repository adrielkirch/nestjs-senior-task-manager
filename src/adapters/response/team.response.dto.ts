import { ApiProperty } from "@nestjs/swagger";

export class TeamResponseDto {
    @ApiProperty({
        description: "The team's ID",
        example: "08afddc9-5b82-43ce-bcec-5187f319131"
    })
    id: string;

    @ApiProperty({
        description: "The team's admin email",
        example: "john.doe@example.com"
    })
    userId: string;

    @ApiProperty({
        description: "The timestamp when the team was created",
        example: "2024-05-08T12:00:00.000Z"
    })
    createdAt: Date;

    @ApiProperty({
        description: "The timestamp when the team was last updated",
        example: "2024-05-08T12:00:00.000Z"
    })
    updatedAt: Date;
}

export class InviteResponseDto {;
    @ApiProperty({
        description: "The jsonwebtoken to be used to join the team",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMDhhZmRkYzktNWI4Mi00M2NlLWJjZWMtNTE4N2YzMTkxM2ZiIiwicm8sZSI6ImFkbWluIiwiaWF0IjoxNzE1MDgxNzIxff.Yg1H7cb5kYUuMUjL2HNXOmKJHheMoosi6yIxIXTdeq4"
    })
    token: string;
}

