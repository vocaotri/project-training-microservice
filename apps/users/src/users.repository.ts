import { User } from '@app/utils/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    private _entityManager: EntityManager, // Add this line
  ) {
    super(_userRepository.metadata.target, _entityManager); // Update this line
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
