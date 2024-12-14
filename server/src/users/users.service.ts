import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(dto: CreateUserDto) {
    this.usersRepository.createUser(dto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  update(dto: UpdateUserDto) {
    return `This action updates a #${dto} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
