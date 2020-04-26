import { IsNotEmpty, IsString } from 'class-validator';
import { IFile } from '../file.interface';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  filmTitle: string;

  @IsNotEmpty()
  @IsString()
  filmLogline: string;

  @IsNotEmpty()
  filmSynopsis: IFile;

  @IsNotEmpty()
  cast: IFile;

  @IsNotEmpty()
  targetAudience: IFile;

  @IsNotEmpty()
  treatment: IFile;

  @IsNotEmpty()
  filmStructure: IFile;
}
