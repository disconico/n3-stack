import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from '../utils/auth/passwords';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);

    if (!user) return null;

    const isValid = await verifyPassword(pass, user.password);

    if (!isValid) return null;

    const { password, ...result } = user;
    return result;
  }
}
