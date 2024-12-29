import { DataSource, Repository } from 'typeorm';
import { TaskStatus } from './dto/base-task.dto';
import { TaskEntity } from './entities/task.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '@/users/entities/user.entity';

@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  private logger = new Logger('Tasks Repository');
  constructor(protected readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }
  async getTaskList(filter, user: UserEntity) {
    const { search, status, deactivate } = filter;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }
    if (deactivate) {
      query.andWhere(`task.deactivate = :deactivate`, { deactivate });
    }

    if (search) {
      query.andWhere(
        `(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))`,
        { search: `%${search}%` },
      );
    }
    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filter)}`,
      );
      throw new InternalServerErrorException();
    }
  }
  async createTask(dto: Partial<TaskEntity>, user: UserEntity) {
    const task = this.create(dto);
    task.user = user;
    try {
      await this.save(task);
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to create task for user "${user.username}". Data: ${JSON.stringify(dto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
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
