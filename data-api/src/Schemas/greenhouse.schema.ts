import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Sensor } from './Sensor.schema';

@Schema()
export class Greenhouse {
  @Prop({
    unique: true,
    required: true,
  })
  identifier: string

  @Prop({
    type:[Sensor],
    default: [],
    required: true,
  })
  sensors: Sensor[]

}
export const GreenhouseSchema=SchemaFactory.createForClass(Greenhouse)  