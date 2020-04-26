import { IFile } from './file.interface';

export interface IFileObject {
  filmSynopsis?: IFile[];
  cast?: IFile[];
  targetAudience?: IFile[];
  treatment?: IFile[];
  filmStructure?: IFile[];
}
