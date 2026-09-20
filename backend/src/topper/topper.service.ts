import { Injectable } from '@nestjs/common';
import { CreateTopperDto } from './dto/create-topper.dto.js';
import { UpdateTopperDto } from './dto/update-topper.dto.js';

@Injectable()
export class TopperService {
  create(createTopperDto: CreateTopperDto) {
    return 'This action adds a new topper';
  }

  findAll() {
    return `This action returns all topper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topper`;
  }

  update(id: number, updateTopperDto: UpdateTopperDto) {
    return `This action updates a #${id} topper`;
  }

  remove(id: number) {
    return `This action removes a #${id} topper`;
  }
}
