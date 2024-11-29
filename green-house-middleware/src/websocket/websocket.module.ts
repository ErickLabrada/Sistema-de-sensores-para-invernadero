import { Module } from '@nestjs/common';
import { WebsocketController } from './websocket.controller';
import { WebsocketService } from './websocket.service';
import { AlarmsService } from 'src/alarms/alarms.service';
import { DataService } from 'src/data/data.service';

@Module({
  controllers: [WebsocketController],
  providers: [WebsocketService,AlarmsService,DataService]
})
export class WebsocketModule {}
