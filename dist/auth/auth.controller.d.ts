import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialDto: AuthCredentialDto): Promise<boolean>;
    signIn(loginDto: LoginDto): Promise<{
        accesstoken: string;
        user: User;
    }>;
}
