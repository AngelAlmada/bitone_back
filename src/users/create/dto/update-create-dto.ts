import { IsInt, IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  name?: string;

  @IsEmail()
  @IsOptional()
  @Length(1, 50)
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  @Length(1, 2)
  rol?: string;

  @IsString()
  @IsOptional()
  id_dealer?: number;

  @IsString()
  @IsOptional()
  @Length(1, 2)
  status?: string;
}
