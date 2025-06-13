import { Injectable } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';

@Injectable()
export class UpdateService {
  update(id: number, updateUpdateDto: UpdateUpdateDto) {
    return `This action updates a #${id} update`;
  }
}
