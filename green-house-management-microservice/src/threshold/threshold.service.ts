import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, MessagePattern, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { Greenhouse } from 'src/domain/greenhouse.entity';
import { Section } from 'src/domain/section.entity';
import { Threshold } from 'src/domain/threshold.entity';
import { CreateThresholdDTO } from 'src/dtos/threshold/create-theshold.dto';
import { GetThresholdsDTO } from 'src/dtos/threshold/get-threshold.dto';
import { UpdateThresholdDTO } from 'src/dtos/threshold/update.threshold.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ThresholdService {
    constructor(
        @InjectRepository(Threshold) private thresholdRepository: Repository<Threshold>,
        @InjectRepository(Greenhouse) private greenhouseRepository: Repository<Greenhouse>,
        @InjectRepository(Section) private sectionRepository: Repository<Section>
    ){
         }
    async createThreshold(createThresholdDTO: CreateThresholdDTO){
        const newThreshold = this.thresholdRepository.create(createThresholdDTO)
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

    async updateThreshold(updateThresholdDTO: UpdateThresholdDTO) {
        const { id, ...updateData } = updateThresholdDTO; 
        await this.thresholdRepository.update(id, updateData);
        return await this.thresholdRepository.findOne({
            where:{id}
        })
    }

    async deleteThreshold(id: number){
        return await this.thresholdRepository.delete(id)
    }
    async getThresholdByGreenhouseAndSection(getThresholdDto: GetThresholdsDTO) {
        // Fetch greenhouse from repository



        const greenhouse = await this.greenhouseRepository.findOne({
            where: { identifier: getThresholdDto.identifier },relations:["sensors","sensors.section","sensors.section.threshold"]
        });
    
        if (!greenhouse) {
            throw new Error('Greenhouse not found');
        }
        console.log(JSON.stringify(greenhouse))

        // Ensure sensors is an array before using find
        if (!Array.isArray(greenhouse.sensors)) {
            throw new Error('Sensors not found');
        }
    

        console.log("A")
        console.log(getThresholdDto.section)
        console.log("B")
        console.log(greenhouse.sensors)

        // Find the section in the sensors array
        const sectionData = greenhouse.sensors.find(sensor =>
            sensor.section.name === getThresholdDto.section
        );
    
        if (!sectionData) {
            throw new Error('Section not found');
        }
    
        return sectionData.section.threshold;
    }
    
}
 