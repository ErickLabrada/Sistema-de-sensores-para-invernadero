import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, MessagePattern, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Threshold } from 'src/domain/threshold.entity';
import { CreateThresholdDTO } from 'src/dtos/threshold/create-theshold.dto';
import { UpdateThresholdDTO } from 'src/dtos/threshold/update.threshold.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ThresholdService {
    constructor(@InjectRepository(Threshold) private thresholdRepository: Repository<Threshold>){
         }
    async createThreshold(createThresholdDTO: CreateThresholdDTO){
        const newThreshold = this.thresholdRepository.create(createThresholdDTO)
        console.log("Created")
        return await this.thresholdRepository.save(newThreshold)
    }

    async getThresholds(){
        return await this.thresholdRepository.find()
    }

    async getThreshold(id: number){
        return await this.thresholdRepository.findOne({
            where:{
                id
            }}
        )
    }

    async updateThreshold(id:number,updateThresholdDTO: UpdateThresholdDTO){
        return await this.thresholdRepository.update(id,updateThresholdDTO)
    }


}