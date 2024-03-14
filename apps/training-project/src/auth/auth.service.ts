import { KAFKA_CONFIG } from '@app/utils/contants';
import { CreateUserDto } from '@app/utils/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(KAFKA_CONFIG.AUTH_PROVIDER)
    private readonly authClient: ClientKafka,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    this.authClient.emit('create_user', JSON.stringify(createUserDto));
  }
}
