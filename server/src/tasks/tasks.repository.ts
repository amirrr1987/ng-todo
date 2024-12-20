import { DataSource, Repository } from 'typeorm';
import { TaskStatus } from './dto/base-task.dto';
import { Task as TaskEntity } from './entities/task.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }
  async getTaskList(filter) {
    const { search, status, deactivate } = filter;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }
    if (deactivate) {
      query.andWhere(`task.deactivate = :deactivate`, { deactivate });
    }

    if (search) {
      query.andWhere(
        `LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)`,
        { search: `%${search}%` },
      );
      debugger;
    }
    return await query.getMany();
  }
  async createTask(dto: Partial<TaskEntity>) {
    const task = await this.create(dto);
    await this.save(task);
    return task;
  }
  async isValid(id): Promise<number> {
    if (!id) {
      throw new BadRequestException(`ID: ${id} is not valid`);
    }
    const index = await this.countBy({ id });
    if (index <= 0) {
      throw new NotFoundException(`Task width this ID: ${id} not found`);
    }
    return index;
  }
  async findTasksByStatus(status: TaskStatus) {
    return await this.findOneBy({ status });
  }
  async findTasksByTitle(title: TaskEntity['title']) {
    return await this.findOneBy({ title });
  }
}
