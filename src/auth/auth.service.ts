import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogInDto } from 'src/users/dto/login.dto';
import { SignUpDto } from 'src/users/dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ username });

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) throw new NotAcceptableException('could not find the user');

    if (user && passwordValid) return user;
    return null;
  }

  async signup(signUpDto: SignUpDto): Promise<User> {
    const { username, password } = signUpDto;

    return this.userModel.create({
      username,
      password,
    });
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
        access_token: this.jwtService.sign(payload),
    };
}
}
