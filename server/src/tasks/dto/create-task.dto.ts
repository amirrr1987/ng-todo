import { PickType } from '@nestjs/mapped-types';
import { BaseTaskDto } from './base-task.dto';

export class CreateTaskRequestDto extends PickType(BaseTaskDto, [
  'title',
  'description',
]) {}
export type CreateTaskResponseDto = BaseTaskDto['id'];
