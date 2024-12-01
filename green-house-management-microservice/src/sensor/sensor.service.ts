import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/domain/section.entity';
import { Sensor } from 'src/domain/sensor.entity';
import { Threshold } from 'src/domain/threshold.entity';
import { UpdateSectionDTO } from 'src/dtos/section/update-section.dto';
import { CreateSensorDTO } from 'src/dtos/sensor/create-sensor.dto';
import { UpdateSensorDTO } from 'src/dtos/sensor/update-sensor.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SensorService {
    constructor(
        @InjectRepository(Sensor) private sensorRepository: Repository<Sensor>,
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
        @InjectRepository(Threshold) private thresholdRepository: Repository<Threshold>,
    ){}

    async createSensor(createSensor: CreateSensorDTO) {
        try {
            const { threshold, ...sectionData } = createSensor.section;
    
            const newThreshold = this.thresholdRepository.create(threshold);
            const savedThreshold = await this.thresholdRepository.save(newThreshold);  
            const newSection = this.sectionRepository.create({
                ...sectionData,   
                threshold: savedThreshold, 
            });

            const savedSection=await this.sectionRepository.save(newSection)

            const newSensor = this.sensorRepository.create({
                ...createSensor,  
                section: newSection,  
            });

            return await this.sensorRepository.save(newSensor);
        } catch (error) {
            console.error("Error creating sensor:", error.message);
            throw new Error("Failed to create sensor and associated data.");
        }
    }
    

    async getSensors(){
        return await this.sensorRepository.find()
    }

    async getSensor(id: number){
        return await this.sensorRepository.findOne({
            where:{
                id
            }}
        )
    }
    async updateSensor(updateSensor: UpdateSensorDTO) {
        const { id, section, ...UpdateSectionDTO } = updateSensor;
    
        try {
            const existingSensor = await this.sensorRepository.findOne({
                where: { id },
                relations: ['section', 'section.threshold'], 
            });
    
            if (!existingSensor) {
                throw new Error(`Sensor with ID ${id} not found.`);
            }
    
            if (section) {
                const { threshold, ...sectionData } = section;
    
                if (threshold) {
                    const thresholdId = existingSensor.section?.threshold?.id;
    
                    if (thresholdId) {
                        await this.thresholdRepository.update(thresholdId, threshold);
                    } else {
                        const newThreshold = this.thresholdRepository.create(threshold);
                        const savedThreshold = await this.thresholdRepository.save(newThreshold);
                        existingSensor.section.threshold = savedThreshold;
                    }
                }
    
                Object.assign(existingSensor.section, sectionData);
                await this.sectionRepository.save(existingSensor.section); 
            }
    
            Object.assign(existingSensor, UpdateSectionDTO);
    
            await this.sensorRepository.save(existingSensor);
            return await this.sensorRepository.findOne({ where: { id }, relations: ['section', 'section.threshold'] });
        } catch (error) {
            console.error("Error updating sensor:", error.message);
            throw new Error("Unable to update sensor.");
        }
    }
    
    

    async deleteSensor(id: number) {
        try {
            const sensor = await this.sensorRepository.findOne({
                where: { id },
                relations: ['section','section.threshold'],
            });
    
            if (!sensor) {
                throw new Error(`Sensor with ID ${id} not found.`);
            }
    
            await this.sensorRepository.delete(id);
            await this.sectionRepository.delete(sensor.section.id)
            await this.thresholdRepository.delete(sensor.section.threshold.id)
        } catch (error) {
            console.error("Error deleting section:", error.message);
            throw new Error("Unable to delete section.");
        }
    }
}