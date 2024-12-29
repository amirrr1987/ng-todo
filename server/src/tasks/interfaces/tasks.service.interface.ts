import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
} from '@/tasks/dto/create-task.dto';
import {
  AllTaskResponseDto,
  DeleteTaskParamDto,
  DeleteTaskResponseDto,
  GetByFilterTaskQueryDto,
  GetOneTaskParamDto,
  GetOneTaskResponseDto,
  UpdateTaskBodyDto,
  UpdateTaskResponseDto,
} from '@/tasks/dto';
import { UserEntity } from '@/users/entities/user.entity';

export interface ITasksService {
  create(
    dto: CreateTaskRequestDto,
    user: UserEntity,
  ): Promise<CreateTaskResponseDto>;
  findAll(
    query: GetByFilterTaskQueryDto,
    user: UserEntity,
  ): Promise<AllTaskResponseDto>;
  findOne(
    dto: GetOneTaskParamDto['id'],
    user: UserEntity,
  ): Promise<GetOneTaskResponseDto>;
  update(
    dto: UpdateTaskBodyDto,
    user: UserEntity,
  ): Promise<UpdateTaskResponseDto>;
  remove(
    dto: DeleteTaskParamDto['id'],
    user: UserEntity,
  ): Promise<DeleteTaskResponseDto>;
}
