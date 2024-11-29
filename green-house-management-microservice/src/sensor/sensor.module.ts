import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'src/domain/sensor.entity';
import { Section } from 'src/domain/section.entity';
import { Threshold } from 'src/domain/threshold.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sensor,Section,Threshold])],
  controllers: [SensorController],
  providers: [SensorService]
})
export class SensorModule {}
