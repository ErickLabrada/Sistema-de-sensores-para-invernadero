import { Module } from '@nestjs/common';
import { ThresholdController } from './threshold.controller';
import { ThresholdService } from './threshold.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Threshold } from 'src/domain/threshold.entity';
import { Greenhouse } from 'src/domain/greenhouse.entity';
import { Section } from 'src/domain/section.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Threshold,Greenhouse,Section]),],
  controllers: [ThresholdController],
  providers: [ThresholdService]
})
export class ThresholdModule {}
