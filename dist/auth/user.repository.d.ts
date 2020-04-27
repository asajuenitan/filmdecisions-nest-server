import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserRepository extends Repository<User> {
    newPassword: string;
    signUp(authCredentialDto: AuthCredentialDto): Promise<string>;
    validateUser(loginDto: LoginDto): Promise<User>;
    private hashPassword;
    private comparePassword;
    updateCompanyDetails(user: User, companyDetails: AuthCredentialDto): Promise<User>;
    ChangeUserStatus(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getOneUser(id: string): Promise<User>;
}
