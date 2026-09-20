import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // Basic logic to create user and student profile
    const user = await this.prisma.user.create({
      data: {
        email: data.email || `${Date.now()}@student.shikshaprabhat.com`,
        password: 'defaultPassword',
        name: data.name,
        role: 'STUDENT',
        student: {
          create: {
            fatherName: data.fatherName,
            motherName: data.motherName,
            mobile: data.mobile,
            address: data.address,
            registrationNumber: data.registrationNumber || null,
          }
        }
      },
      include: { student: true }
    });
    return user;
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: { user: true }
    });
  }

  async remove(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    
    // Delete student then user
    await this.prisma.student.delete({ where: { id } });
    await this.prisma.user.delete({ where: { id: student.userId } });
    return { success: true };
  }
}
