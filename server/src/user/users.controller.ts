import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { IUserController } from './interfaces/users.controller.interface';

@Controller('auth')
export class AuthController implements IUserController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto): Promise<void> {
    return await this.authService.signup(dto);
  }
  @Post('/signin')
  async signin(
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'> & { accessToken: string }> {
    return await this.authService.signin(dto);
  }
}
