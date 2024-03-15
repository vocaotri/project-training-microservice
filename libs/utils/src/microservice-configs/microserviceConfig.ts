import { KafkaOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '../contants';

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      brokers: ['localhost:29092'],
    },
    consumer: {
      groupId: KAFKA_CONFIG.AUTH_CONSUMER,
      allowAutoTopicCreation: true,
    },
  },
};
