import { Body, Controller, Get, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TaskService } from 'src/services/service.task';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { CreateRequestTaskDto } from 'src/adapters/request/adapter.request.task';
import { Request } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('create')
  async create(@Body() dto: CreateRequestTaskDto, @Req() request: Request) {
    dto.userId = request.user
    return await this.taskService.create(dto);
  }

  @Get('paginated')
  @UseInterceptors(DefaultMiddleware)
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.taskService.findPaginated(page, limit);
  }

  @Get('find-by-id')
  @UseInterceptors(DefaultMiddleware)
  async findTaskById(@Query('id') id: string,) {
    return await this.taskService.findById(id);
  }
}
