import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Register a new user with the provided data',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered a new user',
  })
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Login user with the provided credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
  })
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<Users> {
    try {
      return await this.usersService.loginUser(loginUserDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
