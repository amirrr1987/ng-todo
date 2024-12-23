import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsUUID } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsUUID()
  id: string;
}
