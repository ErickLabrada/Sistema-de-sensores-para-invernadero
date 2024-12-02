import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GreenhouseManagerService } from 'src/greenhouse-manager/greenhouse-manager.service';
import { GreenhouseManagerModule } from 'src/greenhouse-manager/greenhouse-manager.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports:[GreenhouseManagerModule, 
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions:{expiresIn:"3600s"}
  })],
  controllers: [AuthController],
  providers: [AuthService,GreenhouseManagerService]
})
export class AuthModule {}
