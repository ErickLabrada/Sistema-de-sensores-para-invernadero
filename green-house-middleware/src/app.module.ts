import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [

    ClientsModule.register([{
      name: "REPORTS_CLIENT",
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://localhost:5672'],
        queue: "REPORTS_QUEUE",
        queueOptions:{
          durable: false
        }
      }},
      {
        name: "MANAGEMENT_CLIENT",
        transport: Transport.RMQ,
        options:{
          urls: ['amqp://localhost:5672'],
          queue: "MANAGEMENT_QUEUE",
          queueOptions:{
            durable: false
          }
        }},
        {
          name: "ALARM_CLIENT",
          transport: Transport.RMQ,
          options:{
            urls: ['amqp://localhost:5672'],
            queue: "ALARM_QUEUE",
            queueOptions:{
              durable: true
            }
          }},
          {
            name: "DATA_CLIENT",
            transport: Transport.RMQ,
            options:{
              urls: ['amqp://localhost:5672'],
              queue: "DATA_QUEUE",
              queueOptions:{
                durable: true
              }
            }},
    ]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
