// nest
import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
// import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
