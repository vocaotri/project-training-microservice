import { MakePaymentDto } from '@app/utils/dtos';
import { Controller, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { JsonStringInterceptor } from '@app/utils/interceptors/json-string';

@Controller()
@UseInterceptors(JsonStringInterceptor)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern('process_payment')
  handleProcessPayment(@Payload(ValidationPipe) data: MakePaymentDto) {
    this.paymentService.processPayment(data);
  }
}
