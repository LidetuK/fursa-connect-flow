import { Controller, Post, Get, Body, HttpException, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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
      console.log('📝 Registration attempt for:', registerDto?.email);
      console.log('📋 Full registration data:', JSON.stringify(registerDto, null, 2));
      console.log('🔍 Request body type:', typeof registerDto);
      console.log('🔍 Request body keys:', Object.keys(registerDto || {}));
      
      // Validate required fields
      if (!registerDto.email) {
        console.log('❌ Registration failed: Email is required');
        throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
      }
      
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      console.log('🔍 Existing user check result:', existingUser ? 'FOUND' : 'NOT FOUND');
      
      if (existingUser) {
        console.log('❌ Registration failed: User already exists');
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      console.log('✅ User does not exist, proceeding with registration');

      // Hash password
      if (!registerDto.password) {
        console.log('❌ Registration failed: Password is required');
        throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
      }
      
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
      console.log('❌ Registration error stack:', error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      // Handle specific bcrypt errors
      if (error.message.includes('Illegal arguments')) {
        throw new HttpException('Invalid password format', HttpStatus.BAD_REQUEST);
      }
      
      throw new HttpException(`Registration failed: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    try {
      console.log('👤 Profile request for user ID:', req.user?.id);
      const user = await this.usersService.findOne(req.user.id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const { password, ...result } = user;
      return result;
    } catch (error) {
      console.log('❌ Profile error:', error.message);
      throw new HttpException('Failed to get profile', HttpStatus.UNAUTHORIZED);
    }
  }
}
