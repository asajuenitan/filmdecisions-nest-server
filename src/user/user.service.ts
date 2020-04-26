import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CompanyDto } from './company.dto';
import { CompanyEntity } from './company.entity';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.getAllUsers();
  }

  async updateCompanyProfile(
    user: User,
    updateData: AuthCredentialDto,
  ): Promise<User> {
    return await this.userRepo.updateCompanyDetails(user, updateData);
  }

  async ChangeUserStatus(id: string): Promise<User> {
    return await this.userRepo.ChangeUserStatus(id);
  }

  async getOneUser(id: string): Promise<User> {
    return await this.userRepo.getOneUser(id);
  }
}
