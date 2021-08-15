import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
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
    //load a module asynchronously
    //TypeOrmModule.forRootAsync({
    //  imports: [ConfigModule],
    //  inject: [ConfigService],
    //  useFactory: async (configService: ConfigService) => {
    //    return {
    //      type: 'postgres',
    //      host: configService.get('DATABASE_HOST'),
    //      port: configService.get('DATABASE_PORT'),
    //      username: configService.get('DATABASE_USERNAME'),
    //      password: configService.get('DATABASE_PASSWORD'),
    //      database: configService.get('DATABASE_NAME'),
    //      autoLoadEntities: true,
    //      synchronize: true,
    //    }
    //  }
    //}),
    AuthModule,
  ],
})
export class AppModule {}
