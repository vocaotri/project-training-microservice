import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@app/utils/contants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const configService = app.get(ConfigService);
  const kafkaHost = 'localhost:' + configService.get('PLAINTEXT_HOST_PORT_M');
  const usersPort = configService.get('USERS_PORT');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaHost],
      },
      consumer: {
        groupId: KAFKA_CONFIG.AUTH_CONSUMER,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(usersPort || 3001);
}
bootstrap();
