import { IsInt, IsNotEmpty, IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsOptional() // porque id generalmente es autoincremental y no lo envías al crear
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  rol: string;

  @IsInt()
  @IsOptional() // si puede ser null o no enviado
  id_dealer?: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  status: string;
}
