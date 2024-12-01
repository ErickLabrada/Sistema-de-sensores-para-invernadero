import { Controller } from '@nestjs/common';
import { GreenhouseService } from './greenhouse.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSensorDTO } from 'src/dtos/sensor/create-sensor.dto';
import { CreateGreenhouseDTO } from 'src/dtos/greenhouse/create-greenhouse.dto';

@Controller('greenhouse')
export class GreenhouseController {
    constructor(private greenhouseService: GreenhouseService) {}

    @MessagePattern("create-greenhouse")
  async createGreenhouse(@Payload() greenHouse: CreateGreenhouseDTO){
      return this.greenhouseService.createGreenhouse(greenHouse)
  }
   
  @MessagePattern("get-greenhouses")
  async getGreenhouses(){
      return this.greenhouseService.getGreenhouses()
  }
  
  @MessagePattern("get-sensor")
  async getSensor(@Payload() id: number){
      return this.greenhouseService.getGreenhouse(id)
  }

}
