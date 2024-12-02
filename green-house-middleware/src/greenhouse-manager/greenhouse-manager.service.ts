import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateThresholdDTO } from './dtos/threshold/create-theshold.dto';
import { UpdateThresholdDTO } from './dtos/threshold/update.threshold.dto';
import { CreateSectionDTO } from './dtos/section/create-section.dto';
import { UpdateSectionDTO } from './dtos/section/update-section.dto';
import { CreateManagerDTO } from './dtos/manager/create-manager.dto';
import { UpdateManagerDto } from './dtos/manager/update-manager.dto';
import { CreateSensorDTO } from './dtos/sensor/create-sensor.dto';
import { UpdateSensorDTO } from './dtos/sensor/update-sensor.dto';
import { CreateGreenhouseDTO } from './dtos/greenhouse/create-greenhouse.dto';
import { UpdateGreenhouseDTO } from './dtos/greenhouse/update-greenhouse.dto';
import { GetThresholdsDTO } from './dtos/threshold/get-threshold.dto';
import { GetManagerDTO } from 'src/alarms/dtos/get-manager.dto';
import { GreenHouseDTO } from 'src/websocket/DTOs/greenhouse.dto';

@Injectable()
export class GreenhouseManagerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'MANAGEMENT_QUEUE',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  getClient(): ClientProxy {
    return this.client;
  }

  async send(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }

  async createThreshold(newThreshold: CreateThresholdDTO) {
    return await this.send('create-threshold', newThreshold);
  }

  async getThresholds() {
    return await this.send('get-thresholds', '');
  }

  async getTheshold(id: number) {
    return await this.send('get-threshold', id);
  }

  async getManagerByGreenhouse(identifier: string): Promise<GetManagerDTO> {
    return this.send('get-manager-by-greenhouse', identifier);
  }

  async getThesholdByGreenhouseAndSection(identifier: string, section: string): Promise<CreateThresholdDTO> {

    const getThresholddto: GetThresholdsDTO = {
      identifier: identifier,
      section: section,
    };
  
    return await this.send('get-threshold-by-greenhouse-and-section', getThresholddto);
  }

  async getGreenhouseByIdentifier(identifier:string):Promise<GreenHouseDTO>{

    return await this.send('get-greenhouse-by-identifier', identifier);

  }


  async updateThreshold(id: number, updateThreshold: UpdateThresholdDTO) {
    updateThreshold.id = id;
    return await this.send('update-thresholds', updateThreshold);
  }

  async deleteThreshold(id: number) {
    return await this.send('delete-thresholds', id);
  }

  async createManager(newManager: CreateManagerDTO) {
    return await this.send('create-manager', newManager);
  }

  async getManagers() {
    return await this.send('get-managers', '');
  }

  async getManager(id: number) {
    return await this.send('get-manager', id);
  }

  async updateManager(id: number, updateManagerDTO: UpdateManagerDto) {
    updateManagerDTO.id = id;
    return await this.send('update-manager', updateManagerDTO);
  }

  async deleteManager(id: number) {
    return await this.send('delete-manager', id);
  }

  async createSection(newSection: CreateSectionDTO) {
    return await this.send('create-section', newSection);
  }

  async getSections() {
    return await this.send('get-sections', '');
  }

  async getSection(id: number) {
    return await this.send('get-section', id);
  }

  async updateSection(id: number, updateSection: UpdateSectionDTO) {
    updateSection.id = id;
    return await this.send('update-section', updateSection);
  }

  async deleteSection(id: number) {
    return await this.send('delete-section', id);
  }

  async createSensor(newSensor: CreateSensorDTO) {
    return await this.send('create-sensor', newSensor);
  }

  async getSensors() {
    return await this.send('get-sensors', '');
  }

  async getSensor(id: number) {
    return await this.send('get-sensor', id);
  }

  async updateSensor(id: number, updateSensor: UpdateSensorDTO) {
    updateSensor.id = id;
    return await this.send('update-sensor', updateSensor);
  }

  async deleteSensor(id: number) {
    return await this.send('delete-sensor', id);
  }

  async createGreenhouse(newGreenhouse: CreateGreenhouseDTO) {
    return await this.send('create-greenhouse', newGreenhouse);
  }

  async getGreenhouses() {
    return await this.send('get-greenhouses', '');
  }

  async getGreenhouse(id: number) {
    return await this.send('get-greenhouse', id);
  }

  async updateGreenhouse(id: number, updateGreenhouse: UpdateGreenhouseDTO) {
    updateGreenhouse.id = id;
    return await this.send('update-greenhouse', updateGreenhouse);
  }

  async deleteGreenhouse(id: number) {
    return await this.send('delete-greenhouse', id);
  }
}
