import { Module } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { ResponseService } from '@/response/response.service';
// import { UsersModule } from '../users/user.module';
// import { UserRepository } from 'src/users/users.repository';
// import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [
    ResponseService,
    TasksService,
    TasksRepository,
    // UsersService,
    // UserRepository,
  ],
})
export class TasksModule {}
