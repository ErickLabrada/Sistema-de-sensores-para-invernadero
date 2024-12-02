import { Module } from '@nestjs/common';
import { GreenhouseController } from './greenhouse.controller';
import { GreenhouseService } from './greenhouse.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Greenhouse, GreenhouseSchema } from 'src/Schemas/greenhouse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Greenhouse.name, schema: GreenhouseSchema },
    ]),
  ],
  controllers: [GreenhouseController],
  providers: [GreenhouseService],
  exports: [GreenhouseService], 
})
export class GreenhouseModule {}
