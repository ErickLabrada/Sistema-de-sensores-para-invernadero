import { Body, Controller, Post } from '@nestjs/common';
import { GreenhouseManagerService } from './greenhouse-manager.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller('greenhouse-manager')
export class GreenhouseManagerController {

    client: ClientProxy

    constructor(private greenhouseManagerService: GreenhouseManagerService){

        this.client=ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{
                urls: ['amqp://localhost:5672'],
                queue: "MANAGEMENT_QUEUE",
                queueOptions:{
                  durable: false
                }
              }
        })
    }

    @Post()
    async createThreshold(@Body() newThreshold: Object) {
        console.log("Sending new threshold to RabbitMQ");
        return await this.greenhouseManagerService.createThreshold(newThreshold); // Await the result here
    }
    

}
