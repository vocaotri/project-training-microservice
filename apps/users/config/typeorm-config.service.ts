import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<any>('USERS_DB_TYPE') || 'mysql',
      host: this.configService.get<string>('USERS_DB_HOST') || 'localhost',
      port: this.configService.get<number>('MYSQL_PORT_M') || 3306,
      username: this.configService.get<string>('MYSQL_USER') || 'root',
      password:
        this.configService.get<string>('MYSQL_PASSWORD') ||
        this.configService.get<string>('MYSQL_ROOT_PASSWORD') ||
        'root',
      database: this.configService.get<string>('MYSQL_DATABASE') || 'n-users',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
