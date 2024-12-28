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

export interface ITasksService {
  create(dto: CreateTaskRequestDto): Promise<CreateTaskResponseDto>;
  findAll(query: GetByFilterTaskQueryDto): Promise<AllTaskResponseDto>;
  findOne(dto: GetOneTaskParamDto['id']): Promise<GetOneTaskResponseDto>;
  update(dto: UpdateTaskBodyDto): Promise<UpdateTaskResponseDto>;
  remove(dto: DeleteTaskParamDto['id']): Promise<DeleteTaskResponseDto>;
}
