import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateRequestCommentDto {
    @ApiProperty({
        description: "The text of the comment",
        example: "Any comment ..."
    })
    @IsString()
    @IsOptional()
    text: string;

    @ApiProperty({
        description: "The ID of the user who has commented",
        example: "9876543210",
        required: false
    })
    @IsString()
    @IsOptional()
    userId?: string;

    @ApiProperty({
        description: "The ID of the task related to the comment",
        example: "9876543210",
        required: false
    })
    @IsString()
    @IsOptional()
    taskId?: string;
}

export class UpdateRequestCommentDto {
    @ApiProperty({
        description: "The ID of the comment to update",
        example: "08afddc9-5b82-43ce-bcec-5187f31913a"
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: "The text the comment",
        example: "Lorem ipsum dolor sit amet, consectetur adipis"
    })
    @IsString()
    text: string;
}