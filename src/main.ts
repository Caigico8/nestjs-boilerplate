require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { mountApiDocs } from './api-docs';
import { mountApiLogs } from './api-logs';
import compression from 'compression';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.enableCors({
    origin: '*',
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  mountApiDocs(app);
  mountApiLogs(app);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
