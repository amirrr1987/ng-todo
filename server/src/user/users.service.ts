import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { AuthRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './common/jwt-payload.interface';
import { IAuthService } from './interfaces/users.service.interface';
import { Auth as AuthEntity } from './entities/user.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { CreateProfileDto } from '../profiles/dto/create-profile.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly profilesService: ProfilesService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(dto: CreateAuthDto): Promise<void> {
    const existingUser = await this.authRepository.findOneBy({
      username: dto.username,
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const authId = await this.authRepository.createAuth(dto);
    console.log('🚀 ~ AuthService ~ signup ~ authId:', authId);
    const x = await this.profilesService.create({
      firstName: 'Test',
      lastName: 'Test',
      authId: authId,
    } as CreateProfileDto);
    return x;
  }
  async signin(
    dto: UpdateAuthDto,
  ): Promise<Omit<AuthEntity, 'password'> & { accessToken: string }> {
    const { username, password } = dto;
    const auth = await this.authRepository.findOneBy({ username });
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