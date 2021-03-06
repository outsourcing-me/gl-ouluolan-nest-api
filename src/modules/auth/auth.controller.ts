import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  async requestJsonWebTokenAfterLocalSignUp(
    @Req() req: Request,
  ): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Post('local/signin')
  async requestJsonWebTokenAfterLocalSignIn(
    @Req() req: Request,
  ): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Get('authorized')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async authorized(): Promise<any> {
    // console.log('Authorized route...');
    return { message: 'Hello' };
  }
}
