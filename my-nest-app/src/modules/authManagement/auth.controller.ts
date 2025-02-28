
import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  RegisterUserDto } from './dto/auth.dto';
import { GoogleAuthGuard } from 'src/auth/google-auth/google-auth.guard';
import { JwtAuthGuard } from 'src/common/jwt/jwt.auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleLogin() {
    return { message: 'Redirecting to Google...' };
  }


 
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  
 
}


