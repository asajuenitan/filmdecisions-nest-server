import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IFile } from 'src/project/file.interface';

export class CreateAgentDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  homeAddress: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephoneNumber: string;

  @IsNotEmpty()
  profilePic: IFile;
}
