import { CreateUserDto } from '@app/utils/dtos';
import {
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { JsonStringInterceptor } from '@app/utils/interceptors/json-string';

@Controller()
@UseInterceptors(JsonStringInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload('userId', ParseIntPipe) userId: number) {
    return this.usersService.getUser(userId);
  }
}
