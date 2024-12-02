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
    ) {}

    async createGreenhouse(createGreenhouse: CreateGreenhouseDTO) {
        try {
            console.log(createGreenhouse.sensor)
            // Check if 'sensor' and 'section' exist
            if (!createGreenhouse.sensor || !createGreenhouse.sensor.section) {
                throw new Error('Sensor or section data is missing');
            }
    
            const { threshold, ...sectionData } = createGreenhouse.sensor.section;
    
            const newThreshold = this.thresholdRepository.create(threshold);
            const savedThreshold = await this.thresholdRepository.save(newThreshold);
    
            const newSection = this.sectionRepository.create({
                ...sectionData,
                threshold: savedThreshold,
            });
            const savedSection = await this.sectionRepository.save(newSection);
    
            const newSensor = this.sensorRepository.create({
                ...createGreenhouse.sensor,
                section: savedSection,
            });
            const savedSensor = await this.sensorRepository.save(newSensor);
    
            const newManager = this.managerRepository.create(createGreenhouse.manager);
            const savedManager = await this.managerRepository.save(newManager);
    
            const newGreenhouse = this.greenhouseRepository.create({
                ...createGreenhouse,
                sensors: [savedSensor],
                manager: savedManager,
            });
    
            return await this.greenhouseRepository.save(newGreenhouse);
        } catch (error) {
            console.error('Error creating greenhouse:', error.message);
            throw new Error('Failed to create greenhouse');
        }
    }
    

    async getGreenhouses() {
        return await this.greenhouseRepository.find({
            relations: ['sensors', 'manager'],
        });
    }

    async getGreenhouseByIdentifier(identifier: string){
        console.log(identifier)
        const greenhouse = await this.greenhouseRepository.findOne({
            where:{identifier:identifier}
        })
        return greenhouse
    }

    async getGreenhouse(id: number) {
        const greenhouse = await this.greenhouseRepository.findOne({
            where: { id },
            relations: ['sensors', 'sensors.section', 'manager'],
        });
        if (!greenhouse) {
            throw new Error(`Greenhouse with ID ${id} not found`);
        }
        return greenhouse;
    }

    async updateGreenhouse(id: number, updateGreenhouse: UpdateGreenhouseDTO) {
        const greenhouse = await this.greenhouseRepository.findOne({
            where: { id },
            relations: ['sensors', 'manager'],
        });
        if (!greenhouse) {
            throw new Error(`Greenhouse with ID ${id} not found`);
        }

        const updatedGreenhouse = this.greenhouseRepository.merge(greenhouse, updateGreenhouse);

        if (updateGreenhouse.manager) {
            const updatedManager = this.managerRepository.create(updateGreenhouse.manager);
            await this.managerRepository.save(updatedManager);
            updatedGreenhouse.manager = updatedManager;
        }

        if (updateGreenhouse.sensor) {
            const { threshold, ...sectionData } = updateGreenhouse.sensor.section;

            const updatedThreshold = this.thresholdRepository.create(threshold);
            await this.thresholdRepository.save(updatedThreshold);

            const updatedSection = this.sectionRepository.create({
                ...sectionData,
                threshold: updatedThreshold,
            });
            await this.sectionRepository.save(updatedSection);

            const updatedSensor = this.sensorRepository.create({
                ...updateGreenhouse.sensor,
                section: updatedSection,
            });
            await this.sensorRepository.save(updatedSensor);

            updatedGreenhouse.sensors = [updatedSensor];
        }

        return await this.greenhouseRepository.save(updatedGreenhouse);
    }

    async deleteGreenhouse(id: number) {
        const greenhouse = await this.greenhouseRepository.findOne({ where: { id } });
        if (!greenhouse) {
            throw new Error(`Greenhouse with ID ${id} not found`);
        }

        return await this.greenhouseRepository.remove(greenhouse);
    }
}
