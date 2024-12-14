/* eslint-disable @typescript-eslint/no-namespace */
import { PickType } from '@nestjs/mapped-types';
import { BaseTaskDto } from './base-task.dto';

export class DeleteTaskParamDto extends PickType(BaseTaskDto, ['id']) {}
export type DeleteTaskResponseDto = BaseTaskDto['id'];
