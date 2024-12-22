import { CreateAuthDto } from '../dto/create-user.dto';
import { UpdateAuthDto } from '../dto/update-user.dto';
import { Auth as AuthEntity } from '../entities/user.entity';

export interface IAuthController {
  signup(dto: CreateAuthDto): Promise<void>;
  signin(
    dto: UpdateAuthDto,
  ): Promise<Omit<AuthEntity, 'password'> & { accessToken: string }>;
}
