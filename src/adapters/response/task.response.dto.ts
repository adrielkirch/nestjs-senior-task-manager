import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
    @ApiProperty({
        description: "The task's ID",
        example: "d36cafe8-d930-43ed-b974-f3c6a4a691e3"
    })
    id: string;

    @ApiProperty({
        description: "The task's title",
        example: "Task Title"
    })
    title: string;

    @ApiProperty({
        description: "The task's text",
        example: "Task Description"
    })
    text: string;

    @ApiProperty({
        description: "The timestamp when the task was created",
        example: "2024-05-08T12:00:00.000Z"
    })
    createdAt: Date;

    @ApiProperty({
        description: "The timestamp when the task was last updated",
        example: "2024-05-08T12:00:00.000Z"
    })
    updatedAt: Date;

    @ApiProperty({
        description: "The task's expiration date",
        example: "2024-06-08T12:00:00.000Z"
    })
    expirationDate: Date;

    @ApiProperty({
        description: "The task's remind date",
        example: "2024-05-08T12:00:00.000Z"
    })
    remindDate: Date;

    @ApiProperty({
        description: "The task's status",
        example: "Pending"
    })
    status: string;

    @ApiProperty({
        description: "The user the task is assigned to",
        example: "John Doe"
    })
    assignTo: string;

    @ApiProperty({
        description: "The ID of the user who created the task",
        example: "d36cafe8-d930-43ed-b974-f3c6a4a69100"
    })
    userId: string;
}
