import { Injectable } from '@nestjs/common';
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

@Injectable()
export class TasksService implements ITasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(dto: CreateTaskRequestDto): Promise<CreateTaskResponseDto> {
    try {
      const task = await this.tasksRepository.createTask(dto);
      return task.id;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(query): Promise<AllTaskResponseDto> {
    return await this.tasksRepository.getTaskList(query);
  }

  async findOne(id: GetOneTaskParamDto['id']): Promise<GetOneTaskResponseDto> {
    return await this.tasksRepository.findOneBy({ id });
  }

  async update(dto: UpdateTaskBodyDto): Promise<UpdateTaskResponseDto> {
    const task = await this.findOne(dto.id);
    _.assign(
      task,
      _.pick(dto, ['description', 'status', 'title', 'deactivate']),
    );

    await this.tasksRepository.save(task);

    return dto.id;
  }

  async remove(id: DeleteTaskParamDto['id']): Promise<DeleteTaskResponseDto> {
    await this.tasksRepository.delete(id);
    return id;
  }
}
