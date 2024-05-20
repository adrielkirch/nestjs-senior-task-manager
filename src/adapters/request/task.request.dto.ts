import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Matches, IsIn } from 'class-validator';

import DateUtil from 'src/utils/util.date';

export class CreateRequestTaskDto {
    @ApiProperty({
        description: 'The title of the task',
        example: 'Complete project proposal'
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The ID of team',
        example: '08afddc9-5b82-43ce-bcec-5187f319123'
    })
    @IsString()
    teamId: string;

    @ApiProperty({
        description: 'The text description of the task',
        example: 'Write a detailed proposal outlining the project scope, objectives, and timeline.'
    })
    @IsString()
    text: string;

    @ApiProperty({
        description: 'The ID of the user to whom the task is assigned (optional)',
        example: '08afddc9-5b82-43ce-bcec-5187f31913a'
    })
    @IsOptional()
    @IsString()
    userId?: string;

    @ApiProperty({
        description: 'The expiration date of the task in the format YYYY-MM-DD HH:MM:SS (optional)',
        example: '01/31/2030 23:59:59'
    })
    @IsOptional()
    @IsString()
    @Matches(DateUtil.getFefaultFormatRegex(), { message: 'Invalid date format. Please use YYYY-MM-DD HH:MM:SS' })
    expirationDate: string | Date;

    @ApiProperty({
        description: 'The date and time for reminding about the task in the format YYYY-MM-DD HH:MM:SS (optional)',
        example: '01/31/2030 23:59:59'
    })
    @IsOptional()
    @IsString()
    @Matches(DateUtil.getFefaultFormatRegex(), { message: 'Invalid date format. Please use YYYY-MM-DD HH:MM:SS' })
    remindDate: string | Date;

 

    @ApiProperty({
        description: 'The ID of the user to whom the task is assigned (optional)',
        example: '08afddc9-5b82-43ce-bcec-5187f31900a'
    })
    @IsOptional()
    @IsString()
    assignTo?: string;
}

export class UpdateRequestTaskDto {
    @ApiProperty({
        description: 'The ID of the task to update',
        example: '08afddc9-5b82-43ce-bcec-5187f31913a'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The updated title of the task (optional)',
        example: 'Complete project proposal'
    })
    @IsOptional()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The updated text description of the task (optional)',
        example: 'Write a detailed proposal outlining the project scope, objectives, and timeline.'
    })
    @IsOptional()
    @IsString()
    text: string;

    @ApiProperty({
        description: 'The ID of the user to whom the task is assigned (optional)',
        example: '08afddc9-5b82-43ce-bcec-5123f31913a'
    })
    @IsOptional()
    @IsString()
    userId?: string;

    @ApiProperty({
        description: 'The updated expiration date of the task (optional)',
        example: '01/31/2030 23:59:59'
    })
    @IsOptional()
    expirationDate?: string | Date;

    @ApiProperty({
        description: 'The updated date and time for reminding about the task (optional)',
        example: '01/31/2030 23:59:59'
    })
    @IsOptional()
    remindDate?: string | Date;

    @ApiProperty({
        description: 'The updated ID of the user to whom the task is assigned (optional)',
        example: '08afddc9-5b82-43ce-bcec-5187f31913a'
    })
    @IsOptional()
    @IsString()
    assignTo?: string;

    @ApiProperty({
        description: 'The status of the task (optional)',
        example: 'TODO',
        enum: ['TODO', 'IN_PROGRESS', 'DONE'], 
      })
      @IsOptional()
      @IsIn(['TODO', 'IN_PROGRESS', 'DONE'])
      status?: string;
}




