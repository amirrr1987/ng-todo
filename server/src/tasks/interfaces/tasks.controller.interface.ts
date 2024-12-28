import { CreateTaskRequestDto } from '@/tasks/dto/create-task.dto';
import {
  DeleteTaskParamDto,
  GetByFilterTaskQueryDto,
  GetOneTaskParamDto,
  UpdateTaskBodyDto,
} from '../dto';
import { BaseResponse } from '@/tasks/dto/base-task.dto';
import { User as UserEntity } from '@/users/entities/user.entity';

export interface ITasksController {
  create(dto: CreateTaskRequestDto, user: UserEntity): Promise<BaseResponse>;
  findAll(query: GetByFilterTaskQueryDto): Promise<BaseResponse>;
  findOne(dto: GetOneTaskParamDto): Promise<BaseResponse>;
  update(dto: UpdateTaskBodyDto): Promise<BaseResponse>;
  remove(dto: DeleteTaskParamDto): Promise<BaseResponse>;
}
