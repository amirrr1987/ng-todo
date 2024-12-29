import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';

import {
  AllTaskResponseDto,
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  GetOneTaskResponseDto,
  UpdateTaskBodyDto,
  UpdateTaskResponseDto,
  DeleteTaskParamDto,
  DeleteTaskResponseDto,
  GetOneTaskParamDto,
} from './dto';
import { TasksRepository } from './tasks.repository';
import { ITasksService } from './interfaces/tasks.service.interface';
import { UserEntity } from '@/users/entities/user.entity';

@Injectable()
export class TasksService implements ITasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(
    dto: CreateTaskRequestDto,
    user: UserEntity,
  ): Promise<CreateTaskResponseDto> {
    try {
      const task = await this.tasksRepository.createTask(dto, user);
      return task.id;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(query, user): Promise<AllTaskResponseDto> {
    return await this.tasksRepository.getTaskList(query, user);
  }

  async findOne(
    id: GetOneTaskParamDto['id'],
    user: UserEntity,
  ): Promise<GetOneTaskResponseDto> {
    console.log('🚀 ~ TasksService ~ user:', user);
    const found = await this.tasksRepository.findOneBy({
      id,
      user: { id: user.id },
    });
    console.log('🚀 ~ TasksService ~ found:', found);
    if (!found) {
      throw new NotFoundException(`Task width ID ${id} not found`);
    }
    return found;
  }

  async update(
    dto: UpdateTaskBodyDto,
    user: UserEntity,
  ): Promise<UpdateTaskResponseDto> {
    const task = await this.findOne(dto.id, user);
    _.assign(
      task,
      _.pick(dto, ['description', 'status', 'title', 'deactivate']),
    );

    await this.tasksRepository.save(task);

    return dto.id;
  }

  async remove(
    id: DeleteTaskParamDto['id'],
    user: UserEntity,
  ): Promise<DeleteTaskResponseDto> {
    await this.tasksRepository.delete({ id, user });
    return id;
  }
}
