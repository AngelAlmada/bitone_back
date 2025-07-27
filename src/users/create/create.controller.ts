import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CreateService } from './create.service';
import { CreateUserDto } from './dto/create-create.dto';
import { UpdateUserDto } from './dto/update-create-dto';

@Controller('/create')
export class CreateController {
  constructor(private readonly createService: CreateService) {}

  @Post('/user')
  async create(@Body() user: CreateUserDto) {
    return await this.createService.createUser(user);
  }

  @Patch('/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = Number(id);
    return await this.createService.updateUser(userId, updateUserDto);
  }
}
