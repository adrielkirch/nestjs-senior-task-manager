import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CommentResponseDto {

    @ApiProperty({
        description: 'The id of the comment',
        example: '9876543211'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The text of the comment',
        example: 'Any comment ...'
    })
    @IsString()
    text: string;

    @ApiProperty({
        description: 'The ID of the user who has commented',
        example: '9876543211',
        required: false
    })
    @IsString()
    @IsOptional()
    userId?: string;

    @ApiProperty({
        description: 'The ID of the task related to the comment',
        example: '9876543212',
        required: false
    })
    @IsString()
    @IsOptional()
    taskId?: string;
}
