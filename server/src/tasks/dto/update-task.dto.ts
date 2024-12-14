import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { BaseTaskDto } from './base-task.dto';

export class UpdateTaskBodyDto extends IntersectionType(
  PickType(BaseTaskDto, ['id']),
  PartialType(OmitType(BaseTaskDto, ['id'])),
) {}

export type UpdateTaskResponseDto = BaseTaskDto['id'];
