import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ResponseService } from './response/response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { User as UserEntity } from './users/entities/user.entity';
import { Task as TaskEntity } from './tasks/entities/task.entity';
import { UserRepository } from './users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'amir',
      password: '0251',
      database: 'task-management',
      // autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [UserEntity, TaskEntity],
    }),
    TasksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService, UserRepository],
})
export class AppModule {}
