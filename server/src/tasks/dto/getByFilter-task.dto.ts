import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseTaskDto, TaskStatus } from './base-task.dto';

export class GetByFilterTaskQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
export class GetByFilterTaskResponseDto extends Array<BaseTaskDto> {}
