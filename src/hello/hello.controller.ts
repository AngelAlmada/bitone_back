import { Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('/hello')
export class HelloController {
    @Get('/ticket/:num')
    getNumber(@Param('num', ParseIntPipe)num: number) {
        return num + 14;
    }

    @Get('/action/:status')
    getStatus(@Param('status', ParseBoolPipe) status: Boolean) {
        return status;
    }

    @Get('greet')
    @UseGuards(AuthGuard)
    greet(@Query(ValidateuserPipe) query: {name: string, age: number}) {
        console.log(typeof query.age);
        console.log(typeof query.name);
        return `Hello ${query.name}, you are ${query.age} years old`;
    }
}
