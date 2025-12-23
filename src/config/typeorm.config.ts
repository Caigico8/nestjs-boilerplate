require('dotenv').config();

import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const isProduction = process.env.NODE_ENV === 'production';

const sslConfig = (): Partial<PostgresConnectionOptions> => {
  if (!isProduction) return {};

  const databaseSslCa = process.env.DATABASE_SSL_CA?.replace(/\\n/g, '\n');

  return {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
        ca: databaseSslCa,
      },
    },
  };
};

const baseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '12754'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE,
  useUTC: true,
  synchronize: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '../modules/**/*.entity{.ts,.js}')],
  ...sslConfig(),
};

export const typeOrmConfig: PostgresConnectionOptions = {
  ...baseConfig,
};
