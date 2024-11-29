import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websocket/websocket.module';
import { DataModule } from './data/data.module';
import { GreenhouseManagerModule } from './greenhouse-manager/greenhouse-manager.module';
import { ReportsModule } from './reports/reports.module';
import { AlarmsModule } from './alarms/alarms.module';
 
@Module({
  imports: [
    
    WebsocketModule,

    DataModule,

    GreenhouseManagerModule,

    ReportsModule,

    AlarmsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
