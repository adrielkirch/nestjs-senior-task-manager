import { Body, Controller, Delete, Get, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { CommentService } from 'src/services/comment/comment.service';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { CreateRequestCommentDto, UpdateRequestCommentDto } from 'src/adapters/request/comment.request.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommentResponseDto } from 'src/adapters/response/comment.response.dto';
import SchedulerService from 'src/infrastructure/scheduler/service.schedule';

@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['write:comments'])
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: "Comment created successfully",
    type: CommentResponseDto
  })
  @Post('create')
  async create(@Body() dto: CreateRequestCommentDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.commentService.create(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['write:comments'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Comment updated successfully",
    type: CommentResponseDto
  })
  @Put('')
  async update(@Body() dto: UpdateRequestCommentDto) {
    return await this.commentService.update(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:comments'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Comments found successfully",
    type: [CommentResponseDto]
  })
  @Get('paginated')
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.commentService.findPaginated(page, limit);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:comments'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Comment found successfully",
    type: CommentResponseDto
  })
  @Get('find-by-id')
  async findCommentById(@Query('id') id: string) {
    return await this.commentService.findById(id);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['delete:comments'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Comment deleted successfully",
  })
  @Delete('remove')
  async delete(@Query('id') id: string) {
    return await this.commentService.delete(id);
  }

}