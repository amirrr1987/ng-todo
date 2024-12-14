import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(dto: CreateUserDto): Promise<void> {
    try {
      const user = this.create(dto);
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
