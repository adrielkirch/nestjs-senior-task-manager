import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigureModule } from './infrastructure/configure/configure.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './infrastructure/ioc/user/user.module';
import { DefaultController } from './controllers/default/default.controller';
import { DefaultMiddleware } from './middlewares/default.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TaskModule } from './infrastructure/ioc/task/task.module';


@Module({
  imports: [ConfigureModule, DatabaseModule, UserModule, TaskModule],
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
        { path: '/users/signup', method: RequestMethod.POST },
      )
      .forRoutes(
        '/users/*',
        '/tasks/*',
      );
  }
}