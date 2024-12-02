import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Greenhouse } from 'src/Schemas/greenhouse.schema';
import { CreateDataDTO } from './dtos/data/create-data.dto';
import { PersistDataDto } from './dtos/data/persist-data.dto';
import { CreateGreenHouseDTO } from './dtos/greenhouse/create-greenhouse.dto';

@Injectable()
export class GreenhouseService {
  constructor(
    @InjectModel(Greenhouse.name) private readonly greenHouseModel: Model<Greenhouse>,
  ) {}

  async createGreenHouse(createGreenHouseDTO: CreateGreenHouseDTO){
    return await this.greenHouseModel.create(createGreenHouseDTO)
  }

  async persistSensorData(persistDataDto: PersistDataDto) {

    const greenhouse = await this.greenHouseModel.findOne({ identifier: persistDataDto.identifier });

    if (!greenhouse) {
      throw new Error('Greenhouse not found');
    }

    console.log(JSON.stringify(greenhouse))
    console.log(JSON.stringify(persistDataDto))

    const sensor = greenhouse.sensors.find((sensor) => 
        sensor?.section?.name === persistDataDto.name
      );
      

    if (!sensor) {
      throw new Error('Sensor not found');
    }


    const section = sensor.section;

    if (!section) {
      throw new Error('Section not found');
    }

    const newData = {
      temperature: persistDataDto.data.temperature,
      humidity: persistDataDto.data.humidity,
      time: new Date(),
    };

    section.data.push(newData);

    await greenhouse.save();

    return greenhouse;
  }

  async getGreenHouses(){
    return await this.greenHouseModel.find()
  }

}
