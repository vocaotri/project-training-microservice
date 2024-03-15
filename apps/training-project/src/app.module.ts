import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PaymentModule],
})
export class AppModule {}
