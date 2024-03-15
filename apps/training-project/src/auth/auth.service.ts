import { KAFKA_CONFIG } from '@app/utils/contants';
import { CreateUserDto } from '@app/utils/dtos';
import { User } from '@app/utils/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(KAFKA_CONFIG.AUTH_PROVIDER)
    private readonly authClient: ClientKafka,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.authClient.send<User>(
      'create_user',
      JSON.stringify(createUserDto),
    );
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('create_user');
  }
}
