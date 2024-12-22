import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { Auth as AuthEntity } from '../entities/auth.entity';

export interface IAuthService {
  signup(dto: CreateAuthDto): Promise<void>;
  signin(dto: UpdateAuthDto): Promise<Partial<AuthEntity>>;
}
