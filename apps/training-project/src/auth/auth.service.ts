import { KAFKA_CONFIG } from '@app/utils/contants';
import { CreateUserDto } from '@app/utils/dtos';
import { User } from '@app/utils/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ERROR_CODE } from 'apps/training-project/utils/error-code';
import { createErrorException } from 'apps/training-project/utils/error-exception';
import { LoginUserDto } from './dto/login.dto';
import { GetUsersDto } from './dto/get-users.dto';

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

  async getUsers(getUsersDto: GetUsersDto) {
    console.log(getUsersDto);
    // fake data
    const fakeData = [];
    for (let i = 1; i <= getUsersDto.pageSize; i++) {
      fakeData.push({
        id: i,
        name: 'tri vo',
        email: 'vocaotri789@gmail.com',
      } as User);
    }
    return [fakeData, 50];
  }

  async signIn(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return {
      id: 23,
      name: 'tri vo',
      email: 'vocaotri789@gmail.com',
    };
    createErrorException({
      errorCode: ERROR_CODE.USER.UNAUTHORIZED,
      message: 'Unauthorized',
      statusCode: 401,
    });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('create_user');
  }
}
