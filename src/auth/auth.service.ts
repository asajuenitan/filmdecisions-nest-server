import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { promises } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import * as mailer from 'nodemailer';
import { default as config } from '../config';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<boolean> {
    const password = await this.userRepo.signUp(authCredentialDto);
    const sent = await this.sendWelcomeMail(authCredentialDto.email, password);
    if (sent !== true) {
      throw new HttpException('User not Registered', HttpStatus.CONFLICT);
    } else {
      return sent;
    }
  }

  async signIn(
    loginDto: LoginDto,
  ): Promise<{ accesstoken: string; user: User }> {
    const user = await this.userRepo.validateUser(loginDto);

    // const email = await this.userRepo.signIn(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      const payload: JwtPayload = { email: user.email };
      const accesstoken = await this.jwtService.sign(payload);
      this.logger.debug(
        `Generate JWT Token with payload ${JSON.stringify(payload)}`,
      );
      return { accesstoken, user };
    }
  }

  private async sendWelcomeMail(email, password): Promise<boolean> {
    const transporter = mailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.secure,
      auth: {
        user: config.mail.user,
        pass: config.mail.pass,
      },
      tls: {
        rejectUnathorized: false,
      },
    });

    const mailToSend = {
      from: '"Company" <info@filmdecisions.com>',
      to: email,
      subject: 'Successful Registration',
      text: 'Successful Registration',
      html:
        'Hi! <br><br> Thanks for you registration<br><br>' +
        'Your login details: <br>' +
        '<em><strong>Email: </strong>' +
        email +
        '</em><br>' +
        '<em><strong>Password: </strong>' +
        password +
        '</em><br>' +
        '<a href=' +
        config.host.url +
        ':' +
        config.host.port +
        '/login>Click here to login</a>',
    };
    const sent = await new Promise<boolean>(async (resolve, reject) => {
      return await transporter.sendMail(mailToSend, async (err, info) => {
        if (err) {
          this.logger.error('Message not sent: %s', err);
          return reject(false);
        } else {
          this.logger.debug('Message Sent: %s', info);
          return resolve(true);
        }
      });
    });
    return sent;
  }
}
