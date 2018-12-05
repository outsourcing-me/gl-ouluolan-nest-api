import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../../user/user.service';
import { SERVER_CONFIG } from '../../../constants';
import { User } from '../../user/entities/user.entity';
// import { IUser } from '../../user/interfaces/user.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SERVER_CONFIG.jwtSecret,
    });
  }

  public async validate(payload: IJwtPayload, done: Function) {
    const user: User = await this.userService.findUserById(payload.sub);

    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
