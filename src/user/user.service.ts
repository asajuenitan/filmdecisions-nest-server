import { Injectable } from '@nestjs/common';
import { UserRepository } from '../auth/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { AuthCredentialDto } from '../auth/dto/auth-credential.dto';

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
