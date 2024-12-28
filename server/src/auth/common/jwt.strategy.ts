import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '@/users/users.service';
import { User as UserEntity } from '@/users/entities/user.entity';
import { omit } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user: UserEntity = await this.usersService.findByKeyValue(
      'username',
      username,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return omit(user, ['password']);
  }
}
