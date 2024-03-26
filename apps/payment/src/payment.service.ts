import { KAFKA_CONFIG } from '@app/utils/contants';
import { MakePaymentDto } from '@app/utils/dtos';
import { User } from '@app/utils/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_CONFIG.AUTH_PROVIDER)
    private readonly authClient: ClientKafka,
  ) {}

  async processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    console.log('process payment', userId);
    const userRespone = this.authClient.send<User>(
      'get_user',
      JSON.stringify({ userId }),
    );
    const user = await lastValueFrom(userRespone);
    console.log(`process payment for user ${user.name} - amount: ${amount}`);
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
}
