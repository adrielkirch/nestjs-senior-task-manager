import { Module } from '@nestjs/common';
import { ConfigureModule } from './infrastructure/configure/configure.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './infrastructure/ioc/user/user.module';
import { DefaultController } from './controllers/default/default.controller';

@Module({
  imports: [ConfigureModule, DatabaseModule, UserModule],
  controllers: [DefaultController],
  providers: [],
})
export class AppModule {}
