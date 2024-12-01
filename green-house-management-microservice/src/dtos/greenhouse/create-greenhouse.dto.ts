import { CreateManagerDTO } from "../manager/create-manager.dto"
import { CreateSensorDTO } from "../sensor/create-sensor.dto"

export class CreateGreenhouseDTO{

    identifier: string
    sensor: CreateSensorDTO
    manager: CreateManagerDTO

}