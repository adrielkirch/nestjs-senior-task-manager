import { Body, Controller, Delete, Get, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { TaskService } from 'src/services/task/task.service';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { CreateRequestTaskDto, UpdateRequestTaskDto } from 'src/adapters/request/task.request.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskResponseDto } from 'src/adapters/response/task.response.dto';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['write:tasks'])
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: "Task created successfully",
    type: TaskResponseDto
  })
  @Post('create')
  async create(@Body() dto: CreateRequestTaskDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.taskService.create(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['write:tasks'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Task updated successfully",
    type: TaskResponseDto
  })
  @Put('')
  async update(@Body() dto: UpdateRequestTaskDto) {
    return await this.taskService.update(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:tasks'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Tasks found successfully",
    type: [TaskResponseDto]
  })
  @Get('paginated')
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.taskService.findPaginated(page, limit);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:tasks'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Task found successfully",
    type: TaskResponseDto
  })
  @Get('find-by-id')
  async findTaskById(@Query('id') id: string) {
    return await this.taskService.findById(id);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['delete:tasks'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Task deleted successfully",
  })
  @Delete('remove')
  async delete(@Query('id') id: string) {
    return await this.taskService.delete(id);
  }
}