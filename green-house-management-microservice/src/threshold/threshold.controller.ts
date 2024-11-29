import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ThresholdService } from './threshold.service';
import { ClientProxy, ClientProxyFactory, EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { CreateThresholdDTO } from 'src/dtos/threshold/create-theshold.dto';

@Controller('threshold')

export class ThresholdController {

constructor(private thresholdService: ThresholdService){

}
@MessagePattern("create-threshold")
async createThreshold(@Payload() newThreshold: CreateThresholdDTO){
    console.log("received8")
    this.thresholdService.createThreshold(newThreshold)
}
}