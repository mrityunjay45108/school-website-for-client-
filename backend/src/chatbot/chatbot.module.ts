import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service.js';
import { ChatbotController } from './chatbot.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [ChatbotService],
  controllers: [ChatbotController]
})
export class ChatbotModule {}
