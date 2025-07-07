import { IsString, Length, Matches, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateDealerDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  last_name2: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  @Matches(/^\d{10}$/, { message: 'El teléfono debe tener exactamente 10 dígitos numéricos' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 2, { message: 'El status debe ser un texto de exactamente 2 caracteres' })
  status: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'El campo src debe ser una URL válida' })
  src?: string;  // campo para la URL de la imagen (opcional)
}
