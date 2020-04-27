import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '../auth/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}
