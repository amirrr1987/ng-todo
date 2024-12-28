import { SignInAuthDto, SignOutAuthDto } from '@/auth/dto';
import { User as UserEntity } from '@/users/entities/user.entity';

export interface IAuthController {
  signIn(
    dto: SignInAuthDto,
  ): Promise<Omit<UserEntity, 'password'> & { accessToken: string }>;
  signUp(dto: SignOutAuthDto): Promise<void>;
}
