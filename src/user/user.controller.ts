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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthCredentialDto } from '../auth/dto/auth-credential.dto';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('admin')
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
  @Roles('admin')
  async ChangeUserStatus(@Param('id') id: string): Promise<User> {
    return await this.userService.ChangeUserStatus(id);
  }

  @Get(':id')
  @Roles('admin')
  async getOneUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getOneUser(id);
  }
}
