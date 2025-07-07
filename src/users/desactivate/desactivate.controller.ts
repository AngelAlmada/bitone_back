import { Controller, Param, Delete, Post } from '@nestjs/common';
import { DesactivateService } from './desactivate.service';

@Controller('/desactivate')
export class DesactivateController {
  constructor(private readonly desactivateService: DesactivateService) {}

  @Post('/user/:id')
  async activateUser(@Param('id') id: string) {
    return await this.desactivateService.activateUser(id);
  }

  @Delete('/user/:id')
  async desactivateUser(@Param('id') id: string) {
    return await this.desactivateService.deactivateUser(id);
  }
}
