import {
  CreateUserDto,
  FindAllUserDto,
  FindByKeyValueUserDto,
  RemoveUserDto,
  UpdateUserDto,
} from '@/users/dto';

export interface IUserController {
  create(dto: CreateUserDto): Promise<void>;
  findAll(dto: FindAllUserDto): Promise<void>;
  findByKeyValue(dto: FindByKeyValueUserDto): Promise<void>;
  update(dto: UpdateUserDto): Promise<void>;
  remove(dto: RemoveUserDto): Promise<void>;
}
