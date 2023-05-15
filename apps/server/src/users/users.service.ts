import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(username: string, password: string) {
    const user = this.repo.create({ username, password });
    return this.repo.save(user);
  }

  async findOne(username: string) {
    return await this.repo.findOneByOrFail({ username });
  }
}
