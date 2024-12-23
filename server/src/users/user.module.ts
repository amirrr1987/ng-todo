import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/jwt.strategy';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfilesRepository } from '../profiles/profiles.repository';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],

  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    JwtStrategy,
    ProfilesService,
    ProfilesRepository,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
