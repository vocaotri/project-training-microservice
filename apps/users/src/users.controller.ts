import { JsonStringInterceptor } from '@app/utils/interceptors/json-string';
import {
  Controller,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { _CreateUserDto } from '../dto/creat-user.dto';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../filters/rpc.filter';

@Controller()
@UseInterceptors(JsonStringInterceptor)
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) data: _CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload('userId', ParseIntPipe) userId: number) {
    return this.usersService.getUser(userId);
  }
}
