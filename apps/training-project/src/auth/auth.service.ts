import { KAFKA_CONFIG } from '@app/utils/contants';
import { CreateUserDto } from '@app/utils/dtos';
import { User } from '@app/utils/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  // constructor(
  //   @Inject(KAFKA_CONFIG.AUTH_PROVIDER)
  //   private readonly authClient: ClientKafka,
  // ) {}

  // async createUser(createUserDto: CreateUserDto) {
  //   const userResponse = this.authClient.send<User>(
  //     'create_respone',
  //     JSON.stringify(createUserDto),
  //   );

  //   try {
  //     const createdUser = await lastValueFrom(userResponse);
  //     return createdUser;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  //   // return this.authClient.emit('create_user', JSON.stringify(createUserDto));
  // }
}
