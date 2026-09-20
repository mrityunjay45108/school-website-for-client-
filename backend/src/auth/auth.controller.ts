import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(@Request() req: any, @Body() body: Record<string, any>) {
    return this.authService.changePassword(req.user.userId, body.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-admin')
  createAdmin(@Body() body: Record<string, any>) {
    return this.authService.createAdmin(body.email, body.name, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins')
  getAdmins() {
    return this.authService.getAdmins();
  }
}
