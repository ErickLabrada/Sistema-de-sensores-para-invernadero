import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GreenhouseManagerService } from 'src/greenhouse-manager/greenhouse-manager.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {

    constructor(
        private greenHouseManagerService: GreenhouseManagerService,
        private jwtService: JwtService
    ){}

    async signIn(identifier: string): Promise<any>{
        const greenhouse= await this.greenHouseManagerService.getGreenhouseByIdentifier(identifier)
        console.log(greenhouse)
        if (!greenhouse){
            throw new UnauthorizedException();
        }
        const payload = {sub: identifier}
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
