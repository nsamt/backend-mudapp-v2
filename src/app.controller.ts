import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(AuthGuard('local'))
  @Post('auth/signin')
  async signin(@Req() req: Request) {
    // console.log('holiiiii');
    
    return this.authService.signin(req.user as User); // Sustituir por el token del backend
  }
}
