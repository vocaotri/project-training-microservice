import { CreateUserDto } from '@app/utils/dtos';
import { Injectable } from '@nestjs/common';
import { CryptoService } from '../config/crypto.service';
import { UsersRepository } from './users.repository';
import { User } from '@app/utils/entities';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    data = {
      ...data,
      password: await this.cryptoService.hashPassword(data.password),
    };
    const user = await this.usersRepository.save(data);
    return user;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    return user;
  }
}
