import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Matches, IsIn, IsEmail } from 'class-validator';

export class CreateRequestTeamDto {
    @ApiProperty({
        description: "The name of the team",
        example: "Complete project proposal"
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "The ID of the user who is the team leader",
        example: "9876543210",
        required: false
    })
    @IsString()
    @IsOptional()
    userId?: string;
}

export class InviteRequestTeamDto {
    @ApiProperty({
        description: "The email to be invited in the team",
        example: "invite@example.com",
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "The ID of the user who is the team leader",
        example: "9876543210",
        required: false
    })
    @IsString()
    @IsOptional()
    userId?: string;

    @ApiProperty({
        description: "The ID of the team who is the team leader",
        example: "9876543210",
        required: false
    })
    @IsString()
    teamId: string;
}

export class JoinRequestTeamDto {
    @ApiProperty({
        description: "The email to be invited in the team",
        example: "invite@example.com",
    })
    token: string;

    @ApiProperty({
        description: "The ID of the user who will ne invited",
        example: "9876543210",
        required: false
    })
    @IsString()
    @IsOptional()
    userId?: string;
}

export class DissociateRequestUserFromTeamDto {
    @ApiProperty({
        description: "The ID of the team who will be dissociate",
        example: "9876543211",
    })
    teamId: string;

    @ApiProperty({
        description: "The ID of the user who will be dissociate",
        example: "9876543212",
        required: true
    })
    @IsString()
    @IsOptional()
    userId?: string;
}
