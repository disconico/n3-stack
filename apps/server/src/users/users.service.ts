import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { hashPassword } from '../utils/auth/passwords';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(username: string, password: string) {
    const user = this.repo.create({ username, password });
    return this.repo.save(user);
  }

  async createUser(username: string, password: string) {
    const isUsernameUsed = await this.isUsernameUsed(username);
    if (isUsernameUsed) {
      throw new BadRequestException('Username is already used');
    }
    const hashedPassword = await hashPassword(password);
    const user = await this.create(username, hashedPassword);
    return user;
  }

  async findOne(username: string) {
    return await this.repo.findOneByOrFail({ username });
  }

  async isUsernameUsed(username: string) {
    const count = await this.repo.count({ where: { username } });
    return count >= 1;
  }
}
