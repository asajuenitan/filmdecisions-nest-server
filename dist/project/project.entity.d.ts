import { BaseEntity, ObjectID } from 'typeorm';
import { ProjectStatus, ApprovalStatus } from './project.status';
import { User } from 'src/auth/user.entity';
import { IFile } from './file.interface';
export declare class ProjectEntity extends BaseEntity {
    _id: ObjectID;
    filmTitle: string;
    filmLogline: string;
    projectFiles: Array<[]>;
    filmSynopsis: IFile;
    cast: IFile;
    targetAudience: IFile;
    treatment: IFile;
    filmStructure: IFile;
    status: ProjectStatus;
    approvalStatus: ApprovalStatus;
    userId: string;
    user: User;
    dateCreated: string;
}
