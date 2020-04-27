import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

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
  registrationNumber?: string;

  @IsString()
  dateOfIncorporation?: string;

  @IsString()
  registeredOfficeAddress?: string;

  @IsString()
  businessAddress?: string;

  @IsString()
  mailingAddress?: string;

  @IsString()
  taxIdentificationNumber?: string;

  @IsString()
  telephoneNumber?: string;

  @IsString()
  companyEmailAddress?: string;
}
