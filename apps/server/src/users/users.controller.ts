import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryFailedError } from 'typeorm';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserClientDto } from './dtos/client-user.dto';

@Controller('users')
@Serialize(UserClientDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.usersService.create(body.username);
      return user;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new BadRequestException('Username is allready in use');
      }
      throw error;
    }
  }
}
