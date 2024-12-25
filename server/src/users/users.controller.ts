import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { IUserController } from './interfaces/users.controller.interface';

@Controller('auth')
export class UsersController implements IUserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto): Promise<void> {
    return await this.usersService.signup(dto);
  }
  @Post('/signin')
  async signin(
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'> & { accessToken: string }> {
    return await this.usersService.signin(dto);
  }
}
