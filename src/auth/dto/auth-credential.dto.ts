import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { IFile } from 'src/project/file.interface';

export class AuthCredentialDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsString()
  @IsOptional()
  dateOfIncorporation?: string;

  @IsString()
  @IsOptional()
  registeredOfficeAddress?: string;

  @IsString()
  @IsOptional()
  businessAddress?: string;

  @IsString()
  @IsOptional()
  mailingAddress?: string;

  @IsString()
  @IsOptional()
  taxIdentificationNumber?: string;

  @IsString()
  @IsOptional()
  telephoneNumber?: string;

  @IsString()
  @IsOptional()
  companyEmailAddress?: string;

  @IsOptional()
  profilePic?: IFile;
}
