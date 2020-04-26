import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/auth/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}
