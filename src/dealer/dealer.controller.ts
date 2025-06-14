import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DealerService } from './dealer.service';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

@Controller('dealer')
export class DealerController {
  constructor(private readonly dealerService: DealerService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDealerDto: CreateDealerDto,
  ) {
    // Validar DTO
    const errors = await validate(createDealerDto);

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));

      throw new BadRequestException({
        message: 'Validación fallida',
        statusCode: 400,
        errors: formattedErrors,
      });
    }

    return this.dealerService.create(
      createDealerDto,
      file?.buffer,
      file?.originalname,
      file?.mimetype,
    );
  }

  @Get()
  findAll() {
    return this.dealerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealerService.findOne(id);
  }

  @Patch(':id')
@UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
async update(
  @Param('id') id: string,
  @Body() updateDealerDto: UpdateDealerDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  // Validar DTO
  const errors = await validate(plainToInstance(UpdateDealerDto, updateDealerDto));
  
  if (errors.length > 0) {
    const formattedErrors = errors.map((err) => ({
      field: err.property,
      errors: Object.values(err.constraints || {}),
    }));

    throw new BadRequestException({
      message: 'Validación fallida',
      statusCode: 400,
      errors: formattedErrors,
    });
  }

  return this.dealerService.update(
    id,
    updateDealerDto,
    file?.buffer,
    file?.originalname,
    file?.mimetype,
  );
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealerService.remove(id);
  }

  @Post('/activate/:id')
  activate(@Param('id') id: string) {
    return this.dealerService.activate(id);
  }

}
