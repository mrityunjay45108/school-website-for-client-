import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // Total Students (Where registrationNumber is NOT null)
    const totalStudents = await this.prisma.student.count({
      where: { registrationNumber: { not: null } }
    });

    // Pending Admissions (Where registrationNumber is null)
    const pendingAdmissions = await this.prisma.student.count({
      where: { registrationNumber: null }
    });

    const totalTeachers = await this.prisma.teacher.count();

    // Sum of all payments this month
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    const payments = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: 'completed',
        createdAt: { gte: firstDay }
      }
    });

    const revenue = payments._sum.amount || 0;

    return {
      totalStudents,
      totalTeachers,
      pendingAdmissions,
      revenue
    };
  }
}
