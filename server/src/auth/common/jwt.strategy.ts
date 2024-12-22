import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthRepository } from '../auth.repository';
import { Auth as AuthEntity } from '../entities/auth.entity';
import { omit } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: AuthRepository) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user: AuthEntity = await this.authRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return omit(user, ['password']);
  }
}
