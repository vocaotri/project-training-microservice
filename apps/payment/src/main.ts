import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@app/utils/contants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const configService = app.get(ConfigService);
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
}
bootstrap();
