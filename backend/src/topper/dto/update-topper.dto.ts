import { PartialType } from '@nestjs/mapped-types';
import { CreateTopperDto } from './create-topper.dto.js';

export class UpdateTopperDto extends PartialType(CreateTopperDto) {}
