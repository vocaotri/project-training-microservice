import { KAFKA_CONFIG } from '@app/utils/contants';
import { CreateUserDto } from '@app/utils/dtos';
import { User } from '@app/utils/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject(KAFKA_CONFIG.AUTH_PROVIDER)
    private readonly authClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    this.authClient.subscribeToResponseOf('create_user');
  }

  getHello(): string {
    return 'Hello World!';
  }
  async createUser(createUserDto: CreateUserDto) {
    // const userResponse = this.authClient.send<User>(
    //   'create_user',
    //   JSON.stringify(createUserDto),
    // );
    // return lastValueFrom(userResponse);
    // return this.authClient.send<User>('get_user', {
    //   userId: 1,
    // });
    return this.authClient.send<User>(
      'create_user',
      JSON.stringify(createUserDto),
    );
  }
}
