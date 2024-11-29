import { Module } from '@nestjs/common';
import { GreenhouseController } from './greenhouse.controller';
import { GreenhouseService } from './greenhouse.service';
import { Greenhouse } from 'src/domain/greenhouse.entity';
import { Sensor } from 'src/domain/sensor.entity';
import { Section } from 'src/domain/section.entity';
import { Threshold } from 'src/domain/threshold.entity';
import { Manager } from 'src/domain/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Greenhouse,Sensor,Section,Threshold,Manager])],
  controllers: [GreenhouseController],
  providers: [GreenhouseService]
})
export class GreenhouseModule {}
