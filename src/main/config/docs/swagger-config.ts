import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: NestExpressApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('NestJS Senior Task Manager')
    .setDescription('The goal of the project is to create a simple task manager for teams. The Arch DDD NestJS API strives to embody software engineering excellence, reaching senior coding proficiency levels by integrating NestJS with Domain-Driven Design (DDD) principles and adhering to clean architecture practices. Emphasizing simplicity and robustness, our project utilizes DDD to create a clear domain model with well-defined boundaries and a ubiquitous language for consistent communication. Test-Driven Development (TDD) ensures reliability, with comprehensive test suites covering individual components, interactions, and user flows. Swagger documentation facilitates seamless API understanding, while Dependency Injection (DI) promotes decoupling and scalability. Our project embraces use cases, repository interfaces for database interactions, and robust cybersecurity measures, including role-based access control and authentication mechanisms. Observability is paramount, with logging, metrics, tracing, monitoring, error handling, and instrumentation to ensure system health and performance optimization. Additionally, Docker is employed to create a separated container for the application, ensuring portability, consistency, and ease of deployment across different environments.')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
};
