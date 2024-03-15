import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = this.configService.get<string>('SALT_OR_ROUNDS');
    return bcrypt.hash(password, parseInt(saltOrRounds));
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
