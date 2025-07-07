import { IsString, MinLength } from 'class-validator'

export class CreateUsersDto {
       
    @IsString()
    @MinLength(1)
    user: string;

    @IsString()
    @MinLength(1)
    password: string;
}  