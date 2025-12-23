import { INestApplication } from '@nestjs/common';
import morgan from 'morgan';

export function mountApiLogs(app: INestApplication<any>) {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
}
