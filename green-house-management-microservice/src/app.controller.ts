import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateThresholdDTO } from './dtos/threshold/create-theshold.dto';
import { ThresholdService } from './threshold/threshold.service';

@Controller()
export class AppController {
  constructor(private thresholdService: ThresholdService){
  }


}
