import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email || "",
        phone: data.phone,
        message: data.message
      }
    });
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async remove(id: string) {
    return this.prisma.contactMessage.delete({ where: { id } });
  }
}
