import { Module } from '@nestjs/common';
import { AlarmsController } from './alarms.controller';
import { AlarmsService } from './alarms.service';
import { GreenhouseManagerService } from 'src/greenhouse-manager/greenhouse-manager.service';
import { DataModule } from 'src/data/data.module';
import { GreenhouseManagerModule } from 'src/greenhouse-manager/greenhouse-manager.module';

@Module({
  imports: [GreenhouseManagerModule], // Import the module containing the service
  controllers: [AlarmsController],
  providers: [AlarmsService,GreenhouseManagerService],
  exports: [AlarmsService],  // Export AlarmsService so it can be used in other modules
})
export class AlarmsModule {}
