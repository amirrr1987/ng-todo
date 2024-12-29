import { CreateUserDto } from '@/users/dto';
import { PickType } from '@nestjs/mapped-types';

export class SignInAuthDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {}
