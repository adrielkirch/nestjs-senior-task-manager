import { APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigureModule } from 'src/infrastructure/configure/configure.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserModule } from 'src/infrastructure/ioc/user/user.module';
import { DefaultController } from 'src/controllers/default/default.controller';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { TaskModule } from 'src/infrastructure/ioc/task/task.module';
import { TeamModule } from './infrastructure/ioc/team/team.module';
import { CommentModule } from './infrastructure/ioc/comment/comment.module';


@Module({
  imports: [ConfigureModule, DatabaseModule, UserModule, TaskModule, TeamModule, CommentModule],
  controllers: [DefaultController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DefaultMiddleware,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DefaultMiddleware)
      .exclude(
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users/signup', method: RequestMethod.POST }
      )
      .forRoutes(
        '/users/*',
        '/tasks/*',
        '/teams/*',
        '/comments/*',
      );
  }
}