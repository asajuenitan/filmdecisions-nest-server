import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
export declare class AuthService {
    private readonly userRepo;
    private jwtService;
    private logger;
    constructor(userRepo: UserRepository, jwtService: JwtService);
    signUp(authCredentialDto: AuthCredentialDto): Promise<boolean>;
    signIn(loginDto: LoginDto): Promise<{
        accesstoken: string;
        user: User;
    }>;
    private sendWelcomeMail;
}
