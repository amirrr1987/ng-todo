import { CreateTaskRequestDto } from '../dto/create-task.dto';
import { UpdateTaskBodyDto } from '../dto/update-task.dto';
import { Task as TaskEntity } from '../entities/task.entity';

export interface ITasksService {
  signup(dto: CreateTaskRequestDto): Promise<void>;
  signin(
    dto: UpdateTaskBodyDto,
  ): Promise<Omit<TaskEntity, 'password'> & { accessToken: string }>;
}
