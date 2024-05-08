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
  // Create a logger instance
  const logger = new Logger('Main');

  // Create an instance of the Nest.js application
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure Swagger documentation
  swaggerConfig(app);

  // Apply global validation pipe to transform incoming data
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Retrieve the port from the configuration
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');

  // Start the Nest.js application and listen for incoming requests on the specified port
  await app.listen(port, () =>
    logger.log(`Server running at: http://localhost:${port}`),
  );
}

// Bootstrap the Nest.js application
bootstrap();
