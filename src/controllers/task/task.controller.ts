import { Body, Controller, Delete, Get, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { TaskService } from 'src/services/task.service';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { CreateRequestTaskDto, UpdateRequestTaskDto } from 'src/adapters/request/task.request.dto';
import { Request } from 'express';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['write:tasks'])
  @Post('create')
  @ApiCreatedResponse({
    description: "Task created successfully",
  })
  async create(@Body() dto: CreateRequestTaskDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.taskService.create(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['write:tasks'])
  @Put('')
  @ApiOkResponse({
    description: "Task updated successfully",
  })
  async update(@Body() dto: UpdateRequestTaskDto, @Req() request: Request) {
    return await this.taskService.update(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:tasks'])
  @Get('paginated')
  @ApiOkResponse({
    description: "Tasks found successfully",
  })
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.taskService.findPaginated(page, limit);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:tasks'])
  @Get('find-by-id')
  @ApiOkResponse({
    description: "Task found successfully",
  })
  async findTaskById(@Query('id') id: string) {
    return await this.taskService.findById(id);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['delete:tasks'])
  @Delete('delete')
  @ApiOkResponse({
    description: "Task deleted successfully",
  })
  async delete(@Query('id') id: string) {
    return await this.taskService.delete(id);
  }
}