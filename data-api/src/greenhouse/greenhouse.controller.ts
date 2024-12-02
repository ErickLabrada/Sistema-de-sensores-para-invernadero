import { Body, Controller, Get, Post } from '@nestjs/common';
import { GreenhouseService } from './greenhouse.service';
import { CreateGreenHouseDTO } from './dtos/greenhouse/create-greenhouse.dto';
import { PersistDataDto } from './dtos/data/persist-data.dto';

@Controller('greenhouse')
export class GreenhouseController {

    constructor(private greenhouseService:GreenhouseService){}

    @Post()
    async createGreenHouse(@Body() createGreenHouseDTO:CreateGreenHouseDTO){
        return await this.greenhouseService.createGreenHouse(createGreenHouseDTO)
    }

    @Get()
    async getGreenHouses(){
        return await this.greenhouseService.getGreenHouses()
    }

    @Post("data")
    async persistData(@Body() persistDataDto:PersistDataDto){
        return await this.greenhouseService.persistSensorData(persistDataDto)
    }

}
