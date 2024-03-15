import { CreateUserDto } from '@app/utils/dtos';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { PaginationPipe } from 'apps/training-project/utils/pipes/paginationPipe.pipe';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('sign-in')
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Get('users')
  getUsers(@Query(PaginationPipe) getUsersDto: GetUsersDto) {
    return this.authService.getUsers(getUsersDto);
  }
}
