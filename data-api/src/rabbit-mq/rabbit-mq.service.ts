import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, MessagePattern, Payload } from '@nestjs/microservices';
import { PersistDataDto } from 'src/greenhouse/dtos/data/persist-data.dto';
import { GreenhouseService } from 'src/greenhouse/greenhouse.service';

@Injectable()
export class RabbitMqService implements OnModuleInit {
  private readonly logger = new Logger(RabbitMqService.name);
  private client: ClientProxy;

    constructor(private greenhouseService: GreenhouseService){}

  onModuleInit() {
    // Initialize the RabbitMQ client
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'], // Match the middleware RabbitMQ setup
        queue: 'DATA_QUEUE',
        queueOptions: {
          durable: true,
        },
      },
    });

    this.logger.log('RabbitMQ client initialized.');
  }

    async persist(data: PersistDataDto) {
    await this.greenhouseService.persistSensorData(data)
    return { success: true, data }; // Example response
  }
}
