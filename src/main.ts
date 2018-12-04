import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_CONFIG } from './constants';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.disable('x-powered-by');
  app.use(helmet());
  // app.use(csurf());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  await app.listen(SERVER_CONFIG.httpPort);
}
bootstrap();
