import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './main/config/docs/swagger-config';

/**
 * Bootstrap the Nest.js application.
 * This function initializes the application, sets up global middleware,
 * retrieves configuration, and starts the server.
 */
async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  swaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');
  await app.listen(port, () =>
    logger.log(`Server running at: http://localhost:${port}`),
  );
}
bootstrap();
