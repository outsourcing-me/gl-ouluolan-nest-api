import { Injectable, Inject } from '@nestjs/common';
// import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
// import { get, post, Response } from 'request';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SERVER_CONFIG } from '../../constants';
// import { IUser } from '../user/interfaces/user.interface';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  private url: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
}
