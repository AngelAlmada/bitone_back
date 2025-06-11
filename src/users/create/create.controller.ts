import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateService } from './create.service';
import { CreateUserDto } from './dto/create-create.dto';

@Controller('/create')
export class CreateController {
  constructor(private readonly createService: CreateService) {}

  @Post('/user')
  create(@Body() user: CreateUserDto) {
    return this.createService.createUser(user);
  }
}
