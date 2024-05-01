// Import the Module decorator from the '@nestjs/common' package
import { Module } from '@nestjs/common';

// Import modules from their respective directories
import { ConfigureModule } from './infrastructure/configure/configure.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './infrastructure/ioc/user/user.module';

// Import the DefaultController
import { DefaultController } from './controllers/default/default.controller';

// Decorate the AppModule class with the @Module decorator
@Module({
  // Specify the modules to be imported by the AppModule
  imports: [ConfigureModule, DatabaseModule, UserModule],
  
  // Specify the controllers to be included in the AppModule
  controllers: [DefaultController],
  
  // Specify the providers (services) to be included in the AppModule
  providers: [],
})
export class AppModule {}
