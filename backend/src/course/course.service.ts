import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.course.create({
      data: {
        name: data.name,
        category: data.category,
        subjects: data.subjects || [],
        fees: parseFloat(data.fees) || 0,
        status: data.status || 'published'
      }
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return this.prisma.course.delete({ where: { id } });
  }
}
