import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ThresholdService } from './threshold.service';
import { ClientProxy, ClientProxyFactory, EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { CreateThresholdDTO } from 'src/dtos/threshold/create-theshold.dto';
import { UpdateThresholdDTO } from 'src/dtos/threshold/update.threshold.dto';
import { GetThresholdsDTO } from 'src/dtos/threshold/get-threshold.dto';

@Controller('threshold')

export class ThresholdController {

constructor(private thresholdService: ThresholdService){}

@MessagePattern("create-threshold")
async createThreshold(@Payload() newThreshold: CreateThresholdDTO){
    return this.thresholdService.createThreshold(newThreshold)
}

@MessagePattern("get-thresholds")
async getThresholds(){
    return this.thresholdService.getThresholds()
}

@MessagePattern("get-threshold")
async getThreshold(@Payload() id: number){
    return this.thresholdService.getThreshold(id)
}

@MessagePattern("update-thresholds")
async updateThreshold(@Payload() updateThresholdDTO: UpdateThresholdDTO){  
    return this.thresholdService.updateThreshold(updateThresholdDTO )
}

@MessagePattern("delete-thresholds")
async deleteThreshold(@Payload() id: number){
    return this.thresholdService.deleteThreshold(id )
}

@MessagePattern("get-threshold-by-greenhouse-and-section")
async getThresholdByGreenhouseAndSection(@Payload() getThresholddto:GetThresholdsDTO){
    return this.thresholdService.getThresholdByGreenhouseAndSection(getThresholddto)
}



}