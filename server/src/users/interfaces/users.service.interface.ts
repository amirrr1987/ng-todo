import {
  CreateUserDto,
  FindAllUserDto,
  FindByKeyValueUserDto,
  RemoveUserDto,
  UpdateUserDto,
} from '@/users/dto';
import { UserEntity } from '@/users/entities/user.entity';
export interface IUserService {
  create(dto: CreateUserDto): Promise<UserEntity['id']>;
  findAll(dto: FindAllUserDto): Promise<UserEntity[]>;
  findByKeyValue(key: string, dto: FindByKeyValueUserDto): Promise<UserEntity>;
  update(dto: UpdateUserDto): Promise<UserEntity['id']>;
  remove(dto: RemoveUserDto['id']): Promise<RemoveUserDto['id']>;
}
