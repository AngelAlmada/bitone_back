import { Body, Controller, Get, Post } from '@nestjs/common';
import { authService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('/auth')
export class AuthController {
    authService:authService;

    constructor(authService:authService) {
        this.authService = authService;
    }

    @Post('/login') 
    getAllAuth(@Body() user: AuthDto) {
        return this.authService.getAuth(user);
    }
}
