import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  changePassword(@Request() req, @Body() body: Record<string, any>) {
    return this.authService.changePassword(req.user.userId, body.newPassword);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-admin')
  createAdmin(@Body() body: Record<string, any>) {
    return this.authService.createAdmin(body.email, body.name, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admins')
  getAdmins() {
    return this.authService.getAdmins();
  }
}
