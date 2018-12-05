import { Injectable, Inject } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SERVER_CONFIG } from '../../constants';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  private url: string;

  constructor(

  ) {
    this.url = `${SERVER_CONFIG.httpProtocol}://${SERVER_CONFIG.domain}:${
      SERVER_CONFIG.httpPort
    }`;
  }

  async createToken(user: User): Promise<IToken> {
    const expiresIn: string = '12h';
    const token: string = sign(
      {
        sub: user.id,
      },
      SERVER_CONFIG.jwtSecret,
      { expiresIn },
    );

    return {
      token,
    };
  }
}
