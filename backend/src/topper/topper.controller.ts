import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopperService } from './topper.service.js';
import { CreateTopperDto } from './dto/create-topper.dto.js';
import { UpdateTopperDto } from './dto/update-topper.dto.js';

@Controller('topper')
export class TopperController {
  constructor(private readonly topperService: TopperService) {}

  @Post()
  create(@Body() createTopperDto: CreateTopperDto) {
    return this.topperService.create(createTopperDto);
  }

  @Get()
  findAll() {
    return this.topperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topperService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopperDto: UpdateTopperDto) {
    return this.topperService.update(id, updateTopperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topperService.remove(id);
  }
}
