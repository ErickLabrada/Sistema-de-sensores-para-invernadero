import { Module } from '@nestjs/common';
import { WebsocketController } from './websocket.controller';
import { WebsocketService } from './websocket.service';
import { AlarmsService } from 'src/alarms/alarms.service';
import { DataService } from 'src/data/data.service';
import { GreenhouseManagerModule } from 'src/greenhouse-manager/greenhouse-manager.module';
import { AlarmsModule } from 'src/alarms/alarms.module';

@Module({
  imports: [GreenhouseManagerModule,AlarmsModule ], // Import the module containing the service
  controllers: [WebsocketController],
  providers: [WebsocketService,DataService]
})
export class WebsocketModule {}
