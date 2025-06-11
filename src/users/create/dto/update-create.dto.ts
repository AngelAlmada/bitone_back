import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-create.dto';

export class UpdateCreateDto extends PartialType(CreateUserDto) {}
