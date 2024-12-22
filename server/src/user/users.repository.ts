import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createAuth(dto: CreateUserDto): Promise<UserEntity['id']> {
    const { password, username } = dto;
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const auth = this.create({ username, password: hashPassword });
      await auth.save();
      return auth.id;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
