import { Controller, Get, Param} from '@nestjs/common';
import { ListService } from './list.service';

@Controller('/list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/users')
  findAll() {
    return this.listService.findAll();
  }

  @Get('/users/:id')
  findOne(@Param('id') id: string) {
    return this.listService.findOneById(id);
  }
}
