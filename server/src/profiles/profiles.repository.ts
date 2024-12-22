import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { DataSource, Repository } from 'typeorm';
import { Profile as ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfilesRepository extends Repository<ProfileEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(ProfileEntity, dataSource.createEntityManager());
  }
  async createProfile(dto: CreateProfileDto): Promise<any> {
    try {
      const profile = this.create(dto);
      const savedProfile = await profile.save();
      return savedProfile;
    } catch (error) {
      console.log('🚀 ~ ProfilesRepository ~ createProfile ~ error:', error);
      throw new InternalServerErrorException();
    }
  }
}
