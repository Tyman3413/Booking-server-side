import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  @ApiBody({ type: RegisterDto, description: "Registration details" })
  @ApiResponse({ description: "User registered successfully", type: String })
  @ApiBadRequestResponse({ description: "Bad Request - Invalid input data" })
  @ApiConflictResponse({
    description: "Conflict - User with this email already exists",
  })
  async register(
    @Body(new ValidationPipe()) registerDto: RegisterDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.register(registerDto);
  }

  @Post("login")
  @ApiBody({ type: LoginDto, description: "Login details" })
  @ApiResponse({ status: 200, description: "User logged in successfully" })
  @ApiBadRequestResponse({ description: "Bad Request - Invalid input data" })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid credentials",
  })
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
