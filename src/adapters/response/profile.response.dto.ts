import { ApiProperty } from '@nestjs/swagger';


export class ProfileResponseDto {
    @ApiProperty({
        description: 'The profile\'s ID',
        example: '08afddc9-5b82-43ce-bcec-5187f319131'
    })
    id: string;

    @ApiProperty({
        description: 'The profile\'s notification preferences',
        example: ['sms','email']
    })
    notifications: string[];

    @ApiProperty({
        description: 'The profile\'s gender',
        example: 'Doe'
    })
    gender: string;

    @ApiProperty({
        description: 'The profile\'s biography',
        example: 'Doe'
    })
    biography: string;


    @ApiProperty({
        description: 'The profile\'s image',
        example: 'Doe'
    })
    image: string;

    @ApiProperty({
        description: 'The user\'s ID',
        example: '08afddc9-5b82-43ce-bcec-5187f319131'
    })
    userId: string;

    @ApiProperty({
        description: 'The timestamp when the profile was created',
        example: '2024-05-08T12:00:00.000Z'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The timestamp when the profile was last updated',
        example: '2024-05-08T12:00:00.000Z'
    })
    updatedAt: Date;
}
