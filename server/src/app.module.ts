import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ResponseService } from './response/response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './user/user.module';
import { UsersModule } from './profiles/profiles.module';
import { User as UserEntity } from './user/entities/user.entity';
import { Task as TaskEntity } from './tasks/entities/task.entity';
import { Profile as ProfileEntity } from './profiles/entities/profile.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'database.sqlite',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'amir',
      password: '0251',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [ProfileEntity, UserEntity, TaskEntity],
    }),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule {}
