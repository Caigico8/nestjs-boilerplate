import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import swStats from 'swagger-stats';

export function mountApiDocs(app: INestApplication<any>) {
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Boilerplate')
    .setDescription('The API description for backend')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'staff-auth',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'user-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI setup
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.use(
    '/docs',
    apiReference({
      content: document,
      favicon: 'https://nestjs.com/logo512.png',
      theme: 'deepSpace',
    }),
  );

  app.use(swStats.getMiddleware({ swaggerSpec: document }));
}
