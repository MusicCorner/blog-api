import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@auth/auth.module';
import { PostsModule } from '@posts/posts.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: +(process.env.POSTGRES_PORT || 0),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      // entities: [Post],
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
