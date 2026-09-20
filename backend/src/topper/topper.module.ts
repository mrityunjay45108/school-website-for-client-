import { Module } from '@nestjs/common';
import { TopperService } from './topper.service.js';
import { TopperController } from './topper.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [TopperController],
  providers: [TopperService],
})
export class TopperModule {}
