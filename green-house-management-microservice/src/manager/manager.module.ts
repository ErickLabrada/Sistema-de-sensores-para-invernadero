import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/domain/manager.entity';
import { Greenhouse } from 'src/domain/greenhouse.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Manager,Greenhouse])],
  controllers: [ManagerController],
  providers: [ManagerService]
})
export class ManagerModule {}
