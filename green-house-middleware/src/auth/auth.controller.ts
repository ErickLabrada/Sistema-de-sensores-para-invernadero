import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post("login")
    signIn(@Body() identifier: LoginDTO){
        console.log("1")
        return this.authService.signIn(identifier.identifier)
    }

}
