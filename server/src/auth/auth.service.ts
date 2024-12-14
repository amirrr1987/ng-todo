import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';

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
    return await this.authRepository.findOneBy({ ...dto });
  }
}
