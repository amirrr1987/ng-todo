import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { IAuthController } from './interfaces/auth.controller.interface';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: CreateAuthDto): Promise<void> {
    return await this.authService.signup(dto);
  }
  @Post('/signin')
  async signin(@Body() dto: UpdateAuthDto): Promise<Partial<Auth>> {
    return await this.authService.signin(dto);
  }
}
