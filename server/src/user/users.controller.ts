import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './users.service';
import { CreateAuthDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { Auth } from './entities/user.entity';
import { IAuthController } from './interfaces/users.controller.interface';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: CreateAuthDto): Promise<void> {
    return await this.authService.signup(dto);
  }
  @Post('/signin')
  async signin(
    @Body() dto: UpdateAuthDto,
  ): Promise<Omit<Auth, 'password'> & { accessToken: string }> {
    return await this.authService.signin(dto);
  }
}
