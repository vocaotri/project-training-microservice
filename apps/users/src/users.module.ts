import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersRepository } from './users.repository';
import { KAFKA_CONFIG } from '@app/utils/contants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../config/typeorm-config.service';
import { User } from './entities/user.entity';
import { CryptoService } from '../config/crypto.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.registerAsync([
      {
        name: KAFKA_CONFIG.AUTH_PROVIDER,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'auth',
              brokers: [
                'localhost:' + configService.get('PLAINTEXT_HOST_PORT_M'),
              ],
            },
            consumer: {
              groupId: KAFKA_CONFIG.AUTH_CONSUMER,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CryptoService],
})
export class UsersModule {}
