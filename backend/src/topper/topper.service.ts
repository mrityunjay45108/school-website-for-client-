import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopperDto } from './dto/create-topper.dto.js';
import { UpdateTopperDto } from './dto/update-topper.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TopperService {
  constructor(private prisma: PrismaService) {}

  create(createTopperDto: CreateTopperDto) {
    return this.prisma.topper.create({
      data: createTopperDto as any
    });
  }

  findAll() {
    return this.prisma.topper.findMany({
      orderBy: { rank: 'asc' }
    });
  }

  findOne(id: string) {
    return this.prisma.topper.findUnique({ where: { id } });
  }

  update(id: string, updateTopperDto: UpdateTopperDto) {
    return this.prisma.topper.update({
      where: { id },
      data: updateTopperDto as any
    });
  }

  remove(id: string) {
    return this.prisma.topper.delete({ where: { id } });
  }
}
