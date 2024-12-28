import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsUUID } from 'class-validator';

export class FindAllUserDto extends PartialType(CreateUserDto) {
  @IsUUID()
  id: string;
}
