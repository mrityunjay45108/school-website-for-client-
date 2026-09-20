import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TopperModule } from './topper/topper.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { NoticeModule } from './notice/notice.module.js';

@Module({
  imports: [TopperModule, PrismaModule, AuthModule, NoticeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
