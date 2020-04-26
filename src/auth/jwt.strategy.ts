import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { default as config } from '../config';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.jwt.secretOrKey,
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
