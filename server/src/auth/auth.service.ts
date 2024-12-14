import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { omit, pick } from 'lodash';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  // async create(createAuthDto: CreateAuthDto) {
  //   return await this.authRepository.createUser(createAuthDto);
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
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
    return omit(user, ['password']);
  }
}
