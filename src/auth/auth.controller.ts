import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/auth.schema';
import { AuthGuard } from './auth.guard';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async registerUser(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(signUpDto);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async logIn(
    @Body() loginDto: LogInDto,
  ): Promise<{ message: string; token: string }> {
    const { email, password } = loginDto;
    const token = await this.authService.logIn(loginDto);
    return { message: 'Login successful', token };
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }
}
