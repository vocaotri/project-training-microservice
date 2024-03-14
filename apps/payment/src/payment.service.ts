import { KAFKA_CONFIG } from '@app/utils/contants';
import { MakePaymentDto } from '@app/utils/dtos';
import { User } from '@app/utils/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PaymentService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_CONFIG.AUTH_PROVIDER)
    private readonly authClient: ClientKafka,
  ) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    console.log('process payment');
    this.authClient
      .send('get_user', JSON.stringify({ userId }))
      .subscribe((user: User) => {
        console.log(
          `process payment for user ${user.name} - amount: ${amount}`,
        );
      });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
}
