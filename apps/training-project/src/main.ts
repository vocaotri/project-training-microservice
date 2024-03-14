import { KAFKA_CONFIG } from '@app/utils/contants';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const gatewayPort = configService.get('GATEWAY_PORT');
  const kafkaHost = 'localhost:' + configService.get('PLAINTEXT_HOST_PORT_M');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaHost],
      },
      consumer: {
        groupId: KAFKA_CONFIG.PAYMENT_CONSUMER,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(gatewayPort || 3000);
}
bootstrap();
