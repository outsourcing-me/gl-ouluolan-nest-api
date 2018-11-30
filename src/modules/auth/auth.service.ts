import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
// import { get, post, Response } from 'request';

import { SERVER_CONFIG, USER_MODEL_TOKEN } from '../../constants';
import { IUser } from '../user/interfaces/user.interface';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  private url: string;

  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
  ) {
    this.url = `${SERVER_CONFIG.httpProtocol}://${SERVER_CONFIG.domain}:${
      SERVER_CONFIG.httpPort
    }`;
  }

  async createToken(user: IUser): Promise<IToken> {
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

  async findUserById(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }
}
