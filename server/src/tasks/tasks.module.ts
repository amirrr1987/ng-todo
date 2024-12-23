import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ResponseService } from '../response/response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksRepository } from './tasks.repository';
import { UsersModule } from '../users/user.module';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfilesRepository } from '../profiles/profiles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    ResponseService,
    TasksRepository,
    ProfilesService,
    ProfilesRepository,
  ],
})
export class TasksModule {}
