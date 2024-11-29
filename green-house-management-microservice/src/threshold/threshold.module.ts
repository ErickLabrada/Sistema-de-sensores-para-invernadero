import { Module } from '@nestjs/common';
import { ThresholdController } from './threshold.controller';
import { ThresholdService } from './threshold.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Threshold } from 'src/domain/threshold.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Threshold]),
],
  controllers: [ThresholdController],
  providers: [ThresholdService]
})
export class ThresholdModule {}
