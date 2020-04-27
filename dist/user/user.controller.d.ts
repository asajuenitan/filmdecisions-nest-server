import { UserService } from './user.service';
import { User } from 'src/auth/user.entity';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    getProfile(user: User): Promise<User>;
    updateCompanyDetails(user: User, updateData: AuthCredentialDto): Promise<User>;
    ChangeUserStatus(id: string): Promise<User>;
    getOneUser(id: string): Promise<User>;
}
