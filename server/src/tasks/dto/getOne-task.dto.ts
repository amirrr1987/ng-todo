import { PickType } from '@nestjs/mapped-types';
import { BaseTaskDto } from './base-task.dto';

export class GetOneTaskParamDto extends PickType(BaseTaskDto, ['id']) {}

export class GetOneTaskResponseDto extends BaseTaskDto {}
