import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { TeacherService } from './teacher.service.js';

@Controller('teachers')
@UseGuards(JwtAuthGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: any) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
