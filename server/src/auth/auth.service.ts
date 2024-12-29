import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service.interface';
import { UsersService } from '@/users/users.service';
import { SignInAuthDto, SignUpAuthDto } from './dto';
import { UserEntity } from '@/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(dto: SignUpAuthDto): Promise<void> {
    const existingUser = await this.userService.findByKeyValue(
      'username',
      dto.username,
    );
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    await this.userService.create(dto);
  }
  async signIn(
    dto: SignInAuthDto,
  ): Promise<Omit<UserEntity, 'password'> & { accessToken: string }> {
    const { username, password } = dto;
    const user = await this.userService.findByKeyValue(`username`, username);
    if (!user) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const compared = await bcrypt.compare(password, user.password);
    if (!compared) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    const payload: JwtPayload = { ...user };
    const accessToken = await this.jwtService.sign(payload);
    return { ...omit(user, ['password']), accessToken };
  }
}
