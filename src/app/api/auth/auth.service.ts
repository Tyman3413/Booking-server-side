import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register({
    firstName,
    email,
    password,
  }: RegisterDto): Promise<{ access_token: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (existingUser) {
      throw new ConflictException(`User with this email already exists`);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = this.userRepository.create({
      firstName,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return this.login(newUser);
  }

  async login(user: any): Promise<{ access_token: string }> {
    return user
      ? {
          access_token: this.jwtService.sign({
            email: user.email,
            sub: user.id,
          }),
        }
      : { access_token: null };
  }
}
