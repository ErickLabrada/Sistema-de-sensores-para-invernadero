import { UpdateManagerDto } from "../manager/update-manager.dto"
import { UpdateSensorDTO } from "../sensor/update-sensor.dto"

export class UpdateGreenhouseDTO{

    id?:number
    identifier?:string
    sensor?: UpdateSensorDTO
    manager?: UpdateManagerDto

}