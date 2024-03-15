import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { TransformInterceptor } from '../utils/interceptors/transform.interceptor';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PaymentModule],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
