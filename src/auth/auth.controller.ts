import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from '../users/dto/signup.dto';
import { LogInDto } from '../users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    const { username, password } = signUpDto;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.authService.signup(signUpDto);

    return { message: 'User registered successfully' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
}
}
