import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const { name, email, password } = signUpDto;

    const hash = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hash,
    });

    return { message: 'User registered successfully' };
  }

  async logIn(loginDto: LogInDto): Promise<string> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found');

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid login credentials');

    const payload = { userId: user._id };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find({});
      return users;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }
}
