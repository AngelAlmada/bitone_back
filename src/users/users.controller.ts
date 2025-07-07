import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUsersDto } from "./dto/update-users-dto";
import { CreateUsersDto } from "./dto/create-users-dto";

@Controller('/users')
export class UsersController {

    usersService:UsersService

    constructor(usersService:UsersService){
        this.usersService = usersService;
    }

    @Get()
    getAllUsers() {
        return this.usersService.getUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(parseInt(id));
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() user: CreateUsersDto) {
        return this.usersService.createUser(user);
    }

    @Put()
    updateUser(@Body('user') user: UpdateUsersDto) {
        return this.usersService.updateUser(user);
    }

    @Delete()
    deleteUser() {
        return "Usuario eliminado";
    }
}