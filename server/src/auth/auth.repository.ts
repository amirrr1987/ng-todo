import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DataSource, Repository } from 'typeorm';
import { Auth as AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(AuthEntity, dataSource.createEntityManager());
  }

  async createUser(dto: CreateAuthDto): Promise<void> {
    const { password, username } = dto;
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const user = this.create({ username, password: hashPassword });
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
