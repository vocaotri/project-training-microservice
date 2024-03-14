import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@app/utils/contants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
            producerOnlyMode: true,
            consumer: {
              groupId: KAFKA_CONFIG.AUTH_CONSUMER,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
