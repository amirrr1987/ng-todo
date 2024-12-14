import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { DataSource, Repository } from 'typeorm';
import { Auth as AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(AuthEntity, dataSource.createEntityManager());
  }

  async createUser(dto: CreateAuthDto): Promise<void> {
    const { password, username } = dto;
    try {
      const user = this.create({ username, password });
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
