import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class NoticeService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string; type: string; pdfUrl?: string; pinned?: boolean }) {
    return this.prisma.notice.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.notice.findMany({
      orderBy: [
        { pinned: 'desc' },
        { publishDate: 'desc' }
      ]
    });
  }

  async findOne(id: string) {
    const notice = await this.prisma.notice.findUnique({ where: { id } });
    if (!notice) throw new NotFoundException('Notice not found');
    return notice;
  }

  async update(id: string, data: Partial<{ title: string; content: string; type: string; pdfUrl: string; pinned: boolean }>) {
    return this.prisma.notice.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.notice.delete({ where: { id } });
  }
}
