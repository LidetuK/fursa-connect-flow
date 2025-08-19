import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      console.log('🔐 Login attempt for:', loginDto.email);
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        console.log('❌ Login failed: Invalid credentials');
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      
      console.log('✅ Login successful for:', loginDto.email);
      return this.authService.login(user);
    } catch (error) {
      console.log('❌ Login error:', error.message);
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      console.log('📝 Registration attempt for:', registerDto.email);
      console.log('📋 Full registration data:', JSON.stringify(registerDto, null, 2));
      
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      console.log('🔍 Existing user check result:', existingUser ? 'FOUND' : 'NOT FOUND');
      
      if (existingUser) {
        console.log('❌ Registration failed: User already exists');
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      console.log('✅ User does not exist, proceeding with registration');

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      console.log('🔐 Password hashed successfully');

      // Create user
      const user = await this.usersService.create({
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      });

      console.log('✅ User created successfully:', user.email);

      // Return login response
      const { password, ...result } = user;
      return this.authService.login(result);
    } catch (error) {
      console.log('❌ Registration error:', error.message);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }
}
