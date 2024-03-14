import { KAFKA_CONFIG } from '@app/utils/contants';
import { MakePaymentDto } from '@app/utils/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(KAFKA_CONFIG.PAYMENT_MICROSERVICE)
    private readonly paymentClient: ClientKafka,
  ) {}

  makePayment(makePaymentDto: MakePaymentDto) {
    this.paymentClient.emit('process_payment', JSON.stringify(makePaymentDto));
  }
}
