import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
