import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { GreenhouseModule } from 'src/greenhouse/greenhouse.module';
import { RabbitMqController } from './rabbit-mq.controller';

@Module({
  imports:[GreenhouseModule],
  providers: [RabbitMqService],
  controllers: [RabbitMqController]
})
export class RabbitMqModule {}
