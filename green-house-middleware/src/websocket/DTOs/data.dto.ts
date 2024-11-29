export class DataDTO {
    Temperature: number;
    Humidity: number;
    Temperature_Unit: string;
  
    constructor(temperature: number, humidity: number, temperatureUnit: string) {
      this.Temperature = temperature;
      this.Humidity = humidity;
      this.Temperature_Unit = temperatureUnit;
    }

  }
  