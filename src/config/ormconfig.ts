import path from 'path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

const pathName = path.resolve(
  __dirname,
  `../../dotenv/${process.env.NODE_ENV || 'development'}.env`
);

const env = config({
  path: pathName,
});

const {
  NODE_POSTGRES_HOST,
  POSTGRES_DB_INNER_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_NAME,
} = env.parsed || {};

export default new DataSource({
  type: 'postgres',
  host: NODE_POSTGRES_HOST,
  port: +POSTGRES_DB_INNER_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB_NAME,
  migrationsTableName: 'migrations',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
});
