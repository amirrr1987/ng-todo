import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signup(dto: CreateAuthDto) {
    return await this.authRepository.createUser(dto);
  }
  async signin(dto: UpdateAuthDto) {
    const { username, password } = dto;
    const user = await this.authRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    const compared = await bcrypt.compare(password, user.password);
    if (!compared) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    const payload = { ...user };
    const accessToken = await this.jwtService.sign(payload);
    return { ...omit(user, ['password']), accessToken };
  }
}
