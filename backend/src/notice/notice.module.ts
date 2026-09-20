import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service.js';
import { NoticeController } from './notice.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
