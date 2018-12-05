import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { use } from 'passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../user/entities/role.entity';
import {
  generateHashedPassword,
  generateSalt,
} from '../../../utilities/encryption';
import { MESSAGES } from '../../../constants';

@Injectable()
export class LocalStrategy {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    this.init();
  }

  private init(): void {
    use(
      'local-signup',
      new Strategy(
        {
          usernameField: 'name',
          passwordField: 'password',
          passReqToCallback: true,
        },
        async (
          req: Request,
          name: string,
          password: string,
          done: Function,
        ) => {
          try {
            if (await this.userRepository.findOne({ name: name })) {
              return done(
                new UnauthorizedException(MESSAGES.UNAUTHORIZED_EMAIL_IN_USE),
                false,
              );
            }
            const salt: string = generateSalt();
            const user: User = new User();
            const reqRoles = req.body.roles

            if (reqRoles) {
              user.roles = await this.roleRepository.findByIds(req.body.roles);
            }
            user.name = name;
            user.salt = salt;
            user.status = 0;
            user.password = generateHashedPassword(salt, password);
            await this.userRepository.save(user);

            done(null, user);
          } catch (error) {
            done(error, false);
          }
        },
      ),
    );

    use(
      'local-signin',
      new Strategy(
        {
          usernameField: 'name',
          passwordField: 'password',
        },
        async (name, password: string, done: Function) => {
          try {
            const user: User = await this.userRepository.findOne({
              name: name,
            });

            if (!user) {
              return done(
                new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_EMAIL),
                false,
              );
            }

            if (generateHashedPassword(user.salt, password) !== user.password) {
              return done(
                new UnauthorizedException(
                  MESSAGES.UNAUTHORIZED_INVALID_PASSWORD,
                ),
                false,
              );
            }

            done(null, user);
          } catch (error) {
            done(error, false);
          }
        },
      ),
    );
  }
}
