import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ResponseService } from '../response/response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksRepository } from './tasks.repository';
import { UsersModule } from '../users/user.module';
import { UserRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    ResponseService,
    TasksRepository,
    UsersService,
    UserRepository,
  ],
})
export class TasksModule {}
