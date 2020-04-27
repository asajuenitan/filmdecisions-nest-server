import { IFile } from '../file.interface';
export declare class CreateProjectDto {
    filmTitle: string;
    filmLogline: string;
    filmSynopsis: IFile;
    cast: IFile;
    targetAudience: IFile;
    treatment: IFile;
    filmStructure: IFile;
}
