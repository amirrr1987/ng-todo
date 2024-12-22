import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { Auth as AuthEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(AuthEntity, dataSource.createEntityManager());
  }

  async createAuth(dto: CreateAuthDto): Promise<AuthEntity['id']> {
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
