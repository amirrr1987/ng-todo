import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthController } from './interfaces/auth.controller.interface';
import { SignInAuthDto, SignOutAuthDto } from './dto';
import { User } from '@/users/entities/user.entity';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(
    @Body() dto: SignInAuthDto,
  ): Promise<Omit<User, 'password'> & { accessToken: string }> {
    return await this.authService.signIn(dto);
  }

  @Post('/signUp')
  async signUp(@Body() dto: SignOutAuthDto): Promise<void> {
    return await this.authService.signUp(dto);
  }
  @Post('/signout')
  async signOut() {
    return this.authService.signOut();
  }
}
