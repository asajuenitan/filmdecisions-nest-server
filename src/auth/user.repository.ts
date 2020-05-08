import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as genPass from 'generate-password';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

const SALT = 10;

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  newPassword = genPass.generate({
    excludeSimilarCharacters: true,
    length: 12,
    lowercase: true,
    uppercase: true,
    numbers: true,
  });
  async signUp(authCredentialDto: AuthCredentialDto): Promise<string> {
    const {
      email,
      firstName,
      lastName,
      jobTitle,
      companyName,
      phone,
    } = authCredentialDto;
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.companyName = companyName;
    user.phone = phone;
    user.jobTitle = jobTitle;
    user.roles = 'user';
    user.salt = bcrypt.genSaltSync(SALT);
    user.active = true;
    user.password = await this.hashPassword(this.newPassword, user.salt);
    try {
      const userExists = await this.findOne({ email });
      if (!userExists) {
        this.save(user);
        return this.newPassword;
      } else {
        throw new ConflictException();
      }
    } catch (err) {
      throw new ConflictException();
    }
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    try {
      const user = await this.findOne({ email });
      const isPasswordValid = await bcrypt.compareSync(password, user.password);
      if (user && isPasswordValid) {
        // delete user.projects;
        delete user.password;
        return user;
      } else {
        throw new UnauthorizedException('Invalid Credentials');
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  private hashPassword(password: string, salt: string) {
    return bcrypt.hashSync(password, salt);
  }

  private comparePassword(password: string, passwordFromDB) {
    return bcrypt.compareSync(password, passwordFromDB);
  }

  async updateCompanyDetails(
    user: User,
    companyDetails: AuthCredentialDto,
  ): Promise<User> {
    const {
      companyName,
      mailingAddress,
      telephoneNumber,
      businessAddress,
      registrationNumber,
      dateOfIncorporation,
      companyEmailAddress,
      registeredOfficeAddress,
      taxIdentificationNumber,
      profilePic,
    } = companyDetails;
    const userExists = await this.findOne(user._id);
    if (userExists) {
      userExists.companyName = companyName;
      userExists.registrationNumber = registrationNumber;
      userExists.dateOfIncorporation = dateOfIncorporation;
      userExists.registeredOfficeAddress = registeredOfficeAddress;
      userExists.businessAddress = businessAddress;
      userExists.mailingAddress = mailingAddress;
      userExists.taxIdentificationNumber = taxIdentificationNumber;
      userExists.telephoneNumber = telephoneNumber;
      userExists.companyEmailAddress = companyEmailAddress;
      userExists.profilePic = profilePic;
    }
    try {
      // this.update(userExists, companyDetails);
      userExists.save();
      return userExists;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async ChangeUserStatus(id: string): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (user.active) {
        user.active = false;
        user.save();
        return user;
      } else {
        user.active = true;
        user.save();
        return user;
      }
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.find();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getOneUser(id: string): Promise<User> {
    try {
      const user = await this.findOneOrFail(id);
      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.findOneOrFail(id);
      if (user) {
        this.delete(user);
      }
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
