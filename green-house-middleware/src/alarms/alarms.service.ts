import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { GreenhouseManagerService } from 'src/greenhouse-manager/greenhouse-manager.service';
import { SendAlarmDTO } from './dtos/send-alarm.dto';
import { CheckAlarmDTO } from './dtos/check-alarm.dto';
import { CreateThresholdDTO } from 'src/greenhouse-manager/dtos/threshold/create-theshold.dto';
import { SendDataDTO } from './dtos/send-data.dto';
import { GetManagerDTO } from './dtos/get-manager.dto';

@Injectable()
export class AlarmsService {
  private client: ClientProxy;

  constructor(private greenhouseManagertService: GreenhouseManagerService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'ALARM_QUEUE',
        queueOptions: {
          durable: true,
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

  async sendAlarm(sendAlarm: SendAlarmDTO) {
    console.log(sendAlarm)

    const manager = await this.greenhouseManagertService.getManagerByGreenhouse(sendAlarm.section);
    sendAlarm.phone = manager.phone;
    console.log("B")
    let details = 'Detalles del registro:\n';

    if (sendAlarm.data.temperature) {
      details =
        details + `Temperatura registrada:  ${sendAlarm.data.temperature}C°\n`;
    }
    if (sendAlarm.data.humidity) {
      details = details + `Humedad registrada:  ${sendAlarm.data.humidity}%\n`;
    }
    console.log("C")
    let message =
      `Hola, ${manager.name}. Se han registrado temperaturas o humedades dañinas en la sección  ${sendAlarm.identifier} del invernadero: ${sendAlarm.section}\n` +
      details;
    sendAlarm.msg = message;
    console.log("MSG")
    console.log(sendAlarm)
    this.send('Alarm', sendAlarm);
  }


  

  async checkThresholds(AlarmDTO: CheckAlarmDTO) {
    let doSend = false;
    const thresholds:CreateThresholdDTO =
      await this.greenhouseManagertService.getThesholdByGreenhouseAndSection(
        AlarmDTO.section,
        AlarmDTO.identifier,
      );

      console.log("Threshold")
      console.log(thresholds)
    let sendDataDTO=new SendDataDTO()

    if (
      AlarmDTO.data.Humidity > thresholds.maximumHumidity ||
      AlarmDTO.data.Humidity <thresholds.minimumHumidity
    ) {
      console.log("HUMIDITY")
      sendDataDTO.humidity = AlarmDTO.data.Humidity;
      doSend = true;
    }
    if (
      AlarmDTO.data.Temperature > thresholds.maximumTemperature ||
      AlarmDTO.data.Temperature < thresholds.minimumTemperature
    ) {
      console.log("TEMPERATURE")
      sendDataDTO.temperature = AlarmDTO.data.Temperature;
      doSend = true;
    }

    if (doSend) {
      let sendAlarm= new SendAlarmDTO();
      sendAlarm.data = sendDataDTO;
      sendAlarm.identifier = AlarmDTO.identifier;
      sendAlarm.section = AlarmDTO.section;
      console.log("Sending")
      this.sendAlarm(sendAlarm);
    }
  }
}
