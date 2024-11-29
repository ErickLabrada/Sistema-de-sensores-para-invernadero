import { Controller } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSectionDTO } from 'src/dtos/section/create-section.dto';
import { CreateSensorDTO } from 'src/dtos/sensor/create-sensor.dto';
import { UpdateSensorDTO } from 'src/dtos/sensor/update-sensor.dto';

@Controller('sensor')
export class SensorController {
  constructor(private sensorService: SensorService) {}

  @MessagePattern("create-sensor")
  async createSensor(@Payload() newSensor: CreateSensorDTO){
      return this.sensorService.createSensor(newSensor)
  }
   
  @MessagePattern("get-sensors")
  async getSensors(){
      return this.sensorService.getSensors()
  }
  
  @MessagePattern("get-sensor")
  async getSensor(@Payload() id: number){
      return this.sensorService.getSensor(id)
  }
  
  @MessagePattern("update-sensor")
  async updateSensor(@Payload() updateSensorDTO: UpdateSensorDTO){  
      return this.sensorService.updateSensor(updateSensorDTO )
  }
  
  @MessagePattern("delete-sensor")
  async deleteSensor(@Payload() id: number){
      return this.sensorService.deleteSensor(id )
  }

}
