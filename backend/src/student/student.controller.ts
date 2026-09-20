import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { StudentService } from './student.service.js';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: any) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
