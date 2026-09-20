import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TopperModule } from './topper/topper.module.js';

@Module({
  imports: [TopperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
