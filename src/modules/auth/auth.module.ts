import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { authenticate } from 'passport';

// Strategies
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';

import { UserModule } from '../user/user.module';
// import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { bodyValidatorMiddleware } from './middlewares/body-validator.middleware';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        bodyValidatorMiddleware,
        authenticate('local-signup', { session: false }),
      )
      .forRoutes({ path: 'api/auth/local/signup', method: RequestMethod.POST });

    consumer
      .apply(
        bodyValidatorMiddleware,
        authenticate('local-signin', { session: false }),
      )
      .forRoutes({ path: 'api/auth/local/signin', method: RequestMethod.POST });
  }
}
