import { BaseEntity, ObjectID } from 'typeorm';
import { ProjectEntity } from 'src/project/project.entity';
export declare class User extends BaseEntity {
    _id: ObjectID;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    salt: string;
    jobTitle: string;
    profilePicPath?: string;
    companyName: string;
    registrationNumber: string;
    dateOfIncorporation: string;
    registeredOfficeAddress: string;
    businessAddress: string;
    mailingAddress: string;
    taxIdentificationNumber: string;
    telephoneNumber: string;
    companyEmailAddress: string;
    active: boolean;
    roles: string;
    projects: ProjectEntity[];
}
