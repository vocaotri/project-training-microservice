import { CreateUserDto } from '@app/utils/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { CryptoService } from '../config/crypto.service';
import { UsersRepository } from './users.repository';
import { KAFKA_CONFIG } from '@app/utils/contants';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
    @Inject(KAFKA_CONFIG.AUTH_PROVIDER)
    private readonly authClient: ClientKafka,
  ) {}

  async createUser1(data: CreateUserDto): Promise<string> {
    console.log('data', data);
    // data = {
    //   ...data,
    //   password: await this.cryptoService.hashPassword(data.password),
    // };
    // const user = await this.usersRepository.save(data);
    // this.authClient.emit('create_user.reply', JSON.stringify(user));
    const user = await this.usersRepository.findOne(1);
    console.log('user', user);
    return JSON.stringify(user);
  }

  async getUser(id: number): Promise<string> {
    const user = await this.usersRepository.findOne(id);
    console.log('user', user);
    return JSON.stringify(user);
  }
}
