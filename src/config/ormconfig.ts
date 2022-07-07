import path from 'path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

console.log(process.env.NODE_ENV);

const pathName = path.resolve(
  __dirname,
  `../../dotenv/${process.env.NODE_ENV || 'development'}.env`
);

const env = config({
  path: pathName,
});

console.log(env);

export default new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'blog',
  migrationsTableName: 'migrations',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
});
