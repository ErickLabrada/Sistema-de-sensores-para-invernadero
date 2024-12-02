import { CreateSensorDTO } from "../sensor/create-sensor.dto"

export class CreateGreenHouseDTO{

    identifier: string
    sensors:CreateSensorDTO[]

}