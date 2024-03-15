import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const gatewayPort = configService.get('GATEWAY_PORT');
  await app.listen(gatewayPort || 3000);
}
bootstrap();
