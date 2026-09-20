import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CourseService } from './course.service.js';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: any) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
