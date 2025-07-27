import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-create.dto';
import { UpdateUserDto } from './dto/update-create-dto';
import { User } from './entities/user.entity';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(userDto); // crea instancia User pero no inserta
    return this.usersRepository.save(user); // inserta en la BD y retorna el usuario con id generado
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Primero buscamos el usuario a actualizar
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    // Si no quieres actualizar password vacío o undefined
    if (updateUserDto.password === '' || updateUserDto.password === undefined) {
      delete updateUserDto.password;
    }

    // Actualiza las propiedades
    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user); // guarda cambios
  }
}
