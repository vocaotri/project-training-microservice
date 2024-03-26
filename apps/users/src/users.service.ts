import { User } from '@app/utils/entities';
import { Injectable } from '@nestjs/common';
import { CryptoService } from '../config/crypto.service';
import { _CreateUserDto } from '../dto/creat-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async createUser(data: _CreateUserDto): Promise<User> {
    data = {
      ...data,
      password: await this.cryptoService.hashPassword(data.password),
    };
    const user = await this.usersRepository.save(data);
    return user;
  }

  async getUser(id: number): Promise<User> {
    console.log('get user', id);
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    return user;
  }

  async checkExisting(column: string, value: string) {
    const userCount = await this.usersRepository.count({
      where: { [column]: value },
    });
    return userCount > 0;
  }
}
