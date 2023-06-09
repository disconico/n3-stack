import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('NICO NODE_ENV:', process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'development') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        url: this.configService.get<string>('DB_NAME'), // Use the connection URL here
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        },
        extra: {
          max: 3,
        },
      };
    } else if (process.env.NODE_ENV === 'test') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        url: this.configService.get<string>('DB_NAME'), // Use the connection URL here
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        },
        extra: {
          max: 3,
        },
      };
    } else if (process.env.NODE_ENV === 'production') {
      const obj = {
        type: this.configService.get<any>('DB_TYPE'),
        url: this.configService.get<string>('DB_NAME'), // Use the connection URL here
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        },
        extra: {
          max: 3,
        },
      };
      console.log('TypeORM config: ', obj);
      return obj;
    }
  }
}
