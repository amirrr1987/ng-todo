import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService {
  constructor(private readonly profilesRepository: ProfilesRepository) {}
  async create(dto: CreateProfileDto) {
    return await this.profilesRepository.createProfile(dto);
  }

  async findAll() {
    return await this.profilesRepository.find();
  }

  async findOne(id: string) {
    return await this.profilesRepository.findOneBy({ id });
  }

  update(dto: UpdateProfileDto) {
    return `This action updates a #${dto} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
