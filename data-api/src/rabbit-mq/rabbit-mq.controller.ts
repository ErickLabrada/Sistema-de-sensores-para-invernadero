import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersistDataDto } from 'src/greenhouse/dtos/data/persist-data.dto';
import { RabbitMqService } from './rabbit-mq.service';

@Controller('rabbit-mq')
export class RabbitMqController {
  constructor(private rabbitService: RabbitMqService) {}

  @MessagePattern('persist')
  async handlePersistData(@Payload() persistDataDto: PersistDataDto) {
    console.log(
      `Received data from middleware: ${JSON.stringify(persistDataDto)}`,
    );
    try {
      const result = await this.rabbitService.persist(persistDataDto);
      console.log(`Data processed successfully: ${JSON.stringify(result)}`);
      return result; // Optionally send an acknowledgment or response back
    } catch (error) {
      console.error('Failed to process data', error);
      throw error;
    }
  }
}
