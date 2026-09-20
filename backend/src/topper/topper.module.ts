import { Module } from '@nestjs/common';
import { TopperService } from './topper.service.js';
import { TopperController } from './topper.controller.js';

@Module({
  controllers: [TopperController],
  providers: [TopperService],
})
export class TopperModule {}
