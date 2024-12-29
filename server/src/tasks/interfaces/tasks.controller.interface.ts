import { CreateTaskRequestDto } from '@/tasks/dto/create-task.dto';
import {
  DeleteTaskParamDto,
  GetByFilterTaskQueryDto,
  GetOneTaskParamDto,
  UpdateTaskBodyDto,
} from '../dto';
import { BaseResponse } from '@/tasks/dto/base-task.dto';
import { UserEntity } from '@/users/entities/user.entity';

export interface ITasksController {
  create(dto: CreateTaskRequestDto, user: UserEntity): Promise<BaseResponse>;
  findAll(
    query: GetByFilterTaskQueryDto,
    user: UserEntity,
  ): Promise<BaseResponse>;
  findOne(dto: GetOneTaskParamDto, user: UserEntity): Promise<BaseResponse>;
  update(dto: UpdateTaskBodyDto, user: UserEntity): Promise<BaseResponse>;
  remove(dto: DeleteTaskParamDto, user: UserEntity): Promise<BaseResponse>;
}
