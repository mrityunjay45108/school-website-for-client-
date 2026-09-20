import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service.js';
import { NoticeController } from './notice.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
