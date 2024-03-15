import { CreateUserDto } from '@app/utils/dtos';
import { OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';

export class LoginUserDto extends OmitType(CreateUserDto, ['name']) {
  @IsOptional()
  @IsBoolean()
  rememberMe: boolean;
}
