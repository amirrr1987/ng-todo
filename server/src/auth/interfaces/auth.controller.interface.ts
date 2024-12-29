import { SignInAuthDto, SignUpAuthDto } from '@/auth/dto';
import { UserEntity } from '@/users/entities/user.entity';

export interface IAuthController {
  signIn(
    dto: SignInAuthDto,
  ): Promise<Omit<UserEntity, 'password'> & { accessToken: string }>;
  signUp(dto: SignUpAuthDto): Promise<void>;
}
