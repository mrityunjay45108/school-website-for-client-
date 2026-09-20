import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    // For demo/development, if user doesn't exist, we create the super admin
    let user = await this.prisma.user.findUnique({ where: { email } });
    
    if (!user && email === 'director@shikshaprabhat.com') {
      const hashedPassword = await bcrypt.hash('12345678', 10);
      user = await this.prisma.user.create({
        data: {
          email: 'director@shikshaprabhat.com',
          password: hashedPassword,
          name: 'Director',
          role: 'SUPER_ADMIN'
        }
      });
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  async changePassword(userId: string, newPass: string) {
    const hashedPassword = await bcrypt.hash(newPass, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
    return { success: true };
  }

  async createAdmin(email: string, name: string, pass: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });
    return { id: user.id, email: user.email, name: user.name };
  }

  async getAdmins() {
    return this.prisma.user.findMany({
      where: { role: 'SUPER_ADMIN' },
      select: { id: true, email: true, name: true, createdAt: true }
    });
  }
}
