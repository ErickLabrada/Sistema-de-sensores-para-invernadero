import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { GreenhouseModule } from './greenhouse/greenhouse.module';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/GreenhouseData"), GreenhouseModule, RabbitMqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
