import { Injectable, HttpCode, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users-dto';
import { UpdateUsersDto } from './dto/update-users-dto';

@Injectable()
export class UsersService {

    private users: any[] = [];

    getUsers(){
        return this.users;
    }

    getUser(id: number) {
        const taskFound = this.users.find(users => users.id === id);

        if (!taskFound) {
            return new NotFoundException(`user with id ${id} not found`); 
        }
        return taskFound;
    }
    
    createUser(user: CreateUsersDto){
        console.log(user);
        this.users.push({
        ...user,
        id: this.users.length + 1.
        });
        return user;
    }

    updateUser(user: UpdateUsersDto){
        console.log(user);
        return "Usuario creado";
    }


}
