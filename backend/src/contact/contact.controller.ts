import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ContactService } from './contact.service.js';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: any) {
    return this.contactService.create(createContactDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
