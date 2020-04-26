import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CompanyDto } from './company.dto';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('user/profile')
  async getProfile(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Put('user/update')
  async updateCompanyDetails(
    @GetUser() user: User,
    @Body() updateData: AuthCredentialDto,
  ): Promise<User> {
    return this.userService.updateCompanyProfile(user, updateData);
  }

  @Put(':id')
  async ChangeUserStatus(@Param('id') id: string): Promise<User> {
    return await this.userService.ChangeUserStatus(id);
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getOneUser(id);
  }
}
