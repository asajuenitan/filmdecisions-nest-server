import { User } from 'src/auth/user.entity';
export declare class CompanyDto {
    companyName: string;
    registrationNumber: string;
    dateOfIncorporation: string;
    registeredOfficeAddress: string;
    businessAddress: string;
    mailingAddress: string;
    taxIdentificationNumber: string;
    telephoneNumber: string;
    companyEmailAddress: string;
    userId: string;
    user: User;
}
