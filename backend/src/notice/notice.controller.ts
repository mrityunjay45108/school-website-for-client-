import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { NoticeService } from './notice.service.js';

@Controller('notices')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNoticeDto: any) {
    return this.noticeService.create(createNoticeDto);
  }

  // Public endpoint for homepage
  @Get()
  findAll() {
    return this.noticeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: any) {
    return this.noticeService.update(id, updateNoticeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
