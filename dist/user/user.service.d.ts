import { UserRepository } from 'src/auth/user.repository';
import { User } from 'src/auth/user.entity';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    getAllUsers(): Promise<User[]>;
    updateCompanyProfile(user: User, updateData: AuthCredentialDto): Promise<User>;
    ChangeUserStatus(id: string): Promise<User>;
    getOneUser(id: string): Promise<User>;
}
