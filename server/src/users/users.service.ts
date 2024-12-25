import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './common/jwt-payload.interface';
import { IUserService } from './interfaces/users.service.interface';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signup(dto: CreateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findOneBy({
      username: dto.username,
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    await this.userRepository.createUser(dto);
  }
  async signin(
    dto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'> & { accessToken: string }> {
    const { username, password } = dto;
    const auth = await this.userRepository.findOneBy({ username });
    if (!auth) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    const compared = await bcrypt.compare(password, auth.password);
    if (!compared) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    const payload: JwtPayload = { ...auth };
    const accessToken = await this.jwtService.sign(payload);
    return { ...omit(auth, ['password']), accessToken };
  }

  
}
