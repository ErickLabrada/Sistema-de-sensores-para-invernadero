import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Greenhouse } from 'src/domain/greenhouse.entity';
import { Manager } from 'src/domain/manager.entity';
import { Section } from 'src/domain/section.entity';
import { Sensor } from 'src/domain/sensor.entity';
import { Threshold } from 'src/domain/threshold.entity';
import { CreateGreenhouseDTO } from 'src/dtos/greenhouse/create-greenhouse.dto';
import { UpdateGreenhouseDTO } from 'src/dtos/greenhouse/update-greenhouse.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GreenhouseService {

    constructor(
        @InjectRepository(Greenhouse) private greenhouseRepository: Repository<Greenhouse>,
        @InjectRepository(Manager) private managerRepository: Repository<Manager>,
        @InjectRepository(Sensor) private sensorRepository: Repository<Sensor>,
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
        @InjectRepository(Threshold) private thresholdRepository: Repository<Threshold>,
    ){}    

    async createGreenhouse(createGreenhouse: CreateGreenhouseDTO) {
        try {
            // Extract threshold and section data from the incoming request
            const { threshold, ...sectionData } = createGreenhouse.sensor.section;
    
            // Create and save the threshold
            const newThreshold = this.thresholdRepository.create(threshold);
            const savedThreshold = await this.thresholdRepository.save(newThreshold);
    
            // Create the section with the saved threshold
            const newSection = this.sectionRepository.create({
                ...sectionData,
                threshold: savedThreshold, // Associate the threshold with the section
            });
    
            // Save the section
            const savedSection = await this.sectionRepository.save(newSection);
    
            // Create the sensor with the saved section
            const newSensor = this.sensorRepository.create({
                ...createGreenhouse.sensor,
                section: savedSection, // Associate the section with the sensor
            });
    
            // Save the sensor
            const savedSensor = await this.sensorRepository.save(newSensor);
    
            // Create and save the manager
            const newManager = this.managerRepository.create(createGreenhouse.manager);
            const savedManager = await this.managerRepository.save(newManager);
    
            // Create the greenhouse and associate the saved sensor and manager
            const newGreenHouse = this.greenhouseRepository.create({
                ...createGreenhouse,
                sensors: [savedSensor], // Ensure sensors is passed as an array
                manager: savedManager,  // Associate the saved manager
            });
    
            // Save the greenhouse and return it
            return await this.greenhouseRepository.save(newGreenHouse);
        } catch (error) {
            console.error("Error creating greenhouse:", error.message);
            throw new Error("Failed to create greenhouse");
        }
    }
    
    

    async getGreenhouses(){
        return await this.greenhouseRepository.find()
    }

    async getGreenhouse(id: number){
        return await this.greenhouseRepository.findOne({
            where:{
                id
            }}
        )
    }

}
