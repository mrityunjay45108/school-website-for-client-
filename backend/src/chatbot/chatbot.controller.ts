import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service.js';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async ask(@Body('query') query: string) {
    if (!query) {
      return { answer: "Please ask a question!" };
    }
    const answer = await this.chatbotService.processQuery(query);
    return { answer };
  }
}
