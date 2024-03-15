import { User } from '@app/utils/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async save(user: User) {
    return this._userRepository.save(user);
  }

  findOne(id: number) {
    return this._userRepository.findOne({
      where: {
        id,
      },
    });
  }

  getUsers(take: number, skip: number, search: string) {
    return this._userRepository.findAndCount({
      where: {
        name: search,
      },
      take,
      skip,
    });
  }
}
