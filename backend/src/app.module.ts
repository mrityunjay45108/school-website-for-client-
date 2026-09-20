import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TopperModule } from './topper/topper.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { NoticeModule } from './notice/notice.module.js';
import { StudentModule } from './student/student.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { TeacherModule } from './teacher/teacher.module.js';
import { CourseModule } from './course/course.module.js';
import { ChatbotModule } from './chatbot/chatbot.module.js';
import { ContactModule } from './contact/contact.module.js';

@Module({
  imports: [TopperModule, PrismaModule, AuthModule, NoticeModule, StudentModule, DashboardModule, TeacherModule, CourseModule, ChatbotModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
