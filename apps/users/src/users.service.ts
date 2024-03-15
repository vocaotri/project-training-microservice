import { CreateUserDto } from '@app/utils/dtos';
import { Injectable } from '@nestjs/common';
import { CryptoService } from '../config/crypto.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async createUser(data: CreateUserDto): Promise<string> {
    data = {
      ...data,
      password: await this.cryptoService.hashPassword(data.password),
    };
    const user = await this.usersRepository.save(data);
    return JSON.stringify(user);
  }

  async getUser(id: number): Promise<string> {
    const user = await this.usersRepository.findOne(id);
    return JSON.stringify(user);
  }
}
