import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email || `${Date.now()}@teacher.shikshaprabhat.com`,
        password: 'defaultPassword',
        name: data.name,
        role: 'TEACHER',
        teacher: {
          create: {
            qualification: data.qualification,
            experience: data.experience,
            subjects: data.subjects || [],
          }
        }
      },
      include: { teacher: true }
    });
    return user;
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      include: { user: true }
    });
  }

  async remove(id: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    
    await this.prisma.teacher.delete({ where: { id } });
    await this.prisma.user.delete({ where: { id: teacher.userId } });
    return { success: true };
  }
}
