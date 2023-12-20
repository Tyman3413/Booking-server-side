import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The first name of the user' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @MinLength(6)
  password: string;
}
