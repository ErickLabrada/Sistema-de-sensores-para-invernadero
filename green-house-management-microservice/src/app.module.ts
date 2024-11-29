import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThresholdModule } from './threshold/threshold.module';
import { Threshold } from './domain/threshold.entity';
import { ThresholdService } from './threshold/threshold.service';
import { SectionModule } from './section/section.module';
import { SensorModule } from './sensor/sensor.module';
import { GreenhouseModule } from './greenhouse/greenhouse.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Threshold]),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: Number(3306),
      username: "root",
      password: "1234",  
      database: "greenhouse_management",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    ThresholdModule,
    SectionModule,
    SensorModule,
    GreenhouseModule,
    ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService,ThresholdService],
})
export class AppModule {}
