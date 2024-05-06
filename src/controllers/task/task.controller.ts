import { Body, Controller, Get, Post, Put, Query, Req, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { TaskService } from 'src/services/service.task';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { CreateRequestTaskDto, UpdateRequestTaskDto } from 'src/adapters/request/adapter.request.task';
import { Request } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('create')
  async create(@Body() dto: CreateRequestTaskDto, @Req() request: Request) {
    dto.userId = request.user
    return await this.taskService.create(dto);
  }

  @Post('delete')
  async delete(@Query('id') id: string,) {
    return await this.taskService.delete(id);
  }

  @Put('')
  async update(@Body() dto: UpdateRequestTaskDto,@Req() request: Request) {
    return await this.taskService.update(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions',['read:tasks'])
  @Get('paginated')
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.taskService.findPaginated(page, limit);
  }

  
  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions',['read:tasks'])
  @Get('find-by-id')
  async findTaskById(@Query('id') id: string,) {
    return await this.taskService.findById(id);
  }
}
