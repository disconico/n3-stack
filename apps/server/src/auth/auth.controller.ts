import { Controller, Request, Post, UseGuards, Res } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.cookie('token', '', { expires: new Date(0) });
    return res.status(200).send({ message: 'Logged out' });
  }
}
