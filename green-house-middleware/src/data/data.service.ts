import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PersistDataDTO } from './dto/persist-data.dto';

@Injectable()
export class DataService {
    private client: ClientProxy;

    constructor(){
        this.client=ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{ 
                urls: ['amqp://localhost:5672'],
                queue: "DATA_QUEUE",
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

      async persistData(persistDataDto: PersistDataDTO){
        console.log("-------------------------------------------------------")
        return this.client.send("persist", persistDataDto);
      }

}