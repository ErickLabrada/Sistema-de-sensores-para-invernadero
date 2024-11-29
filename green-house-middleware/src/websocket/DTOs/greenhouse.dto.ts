import { SensorDTO } from "./sensor.dto";

export class GreenHouseDTO {
    ID: string;
    Sensor: SensorDTO;
  
    constructor(id: string, sensor: SensorDTO) {
      this.ID = id;
      this.Sensor = sensor;
    }
  
  }