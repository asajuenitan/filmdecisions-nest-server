import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    console.log(authCredentialDto);
    return this.authService.signUp(authCredentialDto);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ accesstoken: string }> {
    return this.authService.signIn(loginDto);
  }
}
