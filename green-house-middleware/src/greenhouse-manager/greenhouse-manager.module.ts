import { Module } from '@nestjs/common';
import { GreenhouseManagerService } from './greenhouse-manager.service';
import { GreenhouseManagerController } from './greenhouse-manager.controller';

@Module({
  providers: [GreenhouseManagerService],
  controllers: [GreenhouseManagerController]
})
export class GreenhouseManagerModule {}
