import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";


export class CreateProfileRequestDto {
    @ApiProperty({
        description: "The profile's notification preferences",
        example: ["sms", "email"]
    })
    @IsArray()
    notifications: string[];

    @ApiProperty({
        description: "The profile's gender",
        example: "Doe"
    })
    @IsString()
    gender: string;

    @ApiProperty({
        description: "The profile's image",
        example: "Doe"
    })
    @IsString()
    image: string;

    @ApiProperty({
        description: "The user's ID",
        example: "08afddc9-5b82-43ce-bcec-5187f319131"
    })
    @IsString()
    userId: string;
}

export class UpdateProfileRequestDto {
    @ApiProperty({
        description: "The id of the comment",
        example: "9876543211"
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: "The profile's notification preferences",
        example: ["sms", "email"]
    })
    @IsArray()
    notifications: string[];

    @ApiProperty({
        description: "The profile's gender",
        example: "Doe"
    })
    @IsString()
    gender: string;

    @ApiProperty({
        description: "The profile's image",
        example: "Doe"
    })
    @IsString()
    image: string;

    @ApiProperty({
        description: "The user's ID",
        example: "08afddc9-5b82-43ce-bcec-5187f319131"
    })

    @IsString()
    userId: string;
}

