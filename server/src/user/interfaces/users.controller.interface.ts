import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User as UserEntity } from '../entities/user.entity';

export interface IUserController {
  signup(dto: CreateUserDto): Promise<void>;
  signin(
    dto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'> & { accessToken: string }>;
}
