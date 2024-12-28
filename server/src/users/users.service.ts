import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/users.service.interface';
import { CreateUserDto, UpdateUserDto, RemoveUserDto } from './dto';
import { UserRepository } from './users.repository';
import { User as UserEntity } from './entities/user.entity';
@Injectable()
export class UsersService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity['id']> {
    return await this.userRepository.createUser(dto);
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async findByKeyValue(key: string, value: any): Promise<UserEntity> {
    const condition = { [key]: value };
    return await this.userRepository.findOneBy(condition);
  }
  async update(dto: UpdateUserDto): Promise<UserEntity['id']> {
    await this.userRepository.update(dto.id, dto);
    return dto.id;
  }

  async remove(dto: RemoveUserDto['id']): Promise<UserEntity['id']> {
    await this.userRepository.delete(dto);
    return dto;
  }
}
