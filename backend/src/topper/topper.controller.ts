import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TopperService } from './topper.service.js';
import { CreateTopperDto } from './dto/create-topper.dto.js';
import { UpdateTopperDto } from './dto/update-topper.dto.js';

@Controller('topper')
export class TopperController {
  constructor(private readonly topperService: TopperService) {}

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopperDto: UpdateTopperDto) {
    return this.topperService.update(id, updateTopperDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topperService.remove(id);
  }
}
