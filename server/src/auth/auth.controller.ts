import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthController } from './interfaces/auth.controller.interface';
import { SignInAuthDto, SignUpAuthDto } from './dto';
import { UserEntity } from '@/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(
    @Body() dto: SignInAuthDto,
  ): Promise<Omit<UserEntity, 'password'> & { accessToken: string }> {
    return await this.authService.signIn(dto);
  }

  @Post('/signUp')
  async signUp(@Body() dto: SignUpAuthDto): Promise<void> {
    return await this.authService.signUp(dto);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req) {
    console.log(req.user);
  }
}
