import { CreateUserDto } from '@app/utils/dtos';
import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exists } from '../validation/exist-validate';

export class _CreateUserDto extends OmitType(CreateUserDto, ['email']) {
  @IsEmail()
  @IsNotEmpty()
  @Exists('email', { message: 'Email already exists' })
  email: string;
}
