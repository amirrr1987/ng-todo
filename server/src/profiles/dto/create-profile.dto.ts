import { IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  // @IsUUID()
  // id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsUUID()
  authId: string;
}
