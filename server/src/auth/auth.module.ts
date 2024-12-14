import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth as AuthEntity } from './entities/auth.entity';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],

  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}