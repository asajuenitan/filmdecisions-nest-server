import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/auth/user.entity';

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @IsNotEmpty()
  @IsString()
  dateOfIncorporation: string;

  @IsNotEmpty()
  @IsString()
  registeredOfficeAddress: string;

  @IsNotEmpty()
  @IsString()
  businessAddress: string;

  @IsNotEmpty()
  @IsString()
  mailingAddress: string;

  @IsNotEmpty()
  @IsString()
  taxIdentificationNumber: string;

  @IsNotEmpty()
  @IsString()
  telephoneNumber: string;

  @IsNotEmpty()
  @IsString()
  companyEmailAddress: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  user: User;
}
