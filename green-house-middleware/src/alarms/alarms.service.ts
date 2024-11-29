import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AlarmsService {

    private client: ClientProxy;

    constructor(){

        this.client=ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{
                urls: ['amqp://localhost:5672'],
                queue: "ALARM_QUEUE",
                queueOptions:{
                  durable: true
                }
              }
        })
    }

    getClient(): ClientProxy {
        return this.client;
      }
    
      async send(pattern: string, data: any) {
        return this.client.send(pattern, data).toPromise();
      }


    async sendAlarm(){
        this.send("ALARM_QUEUE","SE ESTÁ QUEMANDO TODO ALV");
    }

    checkThresholds(){
        
    }
}
