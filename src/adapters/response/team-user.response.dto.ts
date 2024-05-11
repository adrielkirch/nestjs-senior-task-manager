import { ApiProperty } from "@nestjs/swagger";


export class TeamUserResponseDto {
    @ApiProperty({
        description: "TheID",
        example: "08afddc9-5b82-43ce-bcec-5187f319131"
    })
    id: string;

    @ApiProperty({
        description: "The user's ID",
        example: "08afddc9-5b82-0000-bcec-5187f319131"
    })
    userId: string;

    @ApiProperty({
        description: "The team's ID",
        example: "08afddc9-1111-0000-bcec-5187f319131"
    })
    teamId: string;

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
