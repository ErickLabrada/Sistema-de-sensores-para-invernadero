import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ReportsService {

    private client: ClientProxy;

    constructor(){

        this.client=ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{
                urls: ['amqp://localhost:5672'],
                queue: "REPORTS_QUEUE",
                queueOptions:{
                  durable: false
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

}
