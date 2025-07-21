import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
