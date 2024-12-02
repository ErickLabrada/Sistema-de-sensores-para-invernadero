import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Section } from './section.scheme';

@Schema()
export class Sensor {

  @Prop({
    type:Section,
    required: true,
  })
  section: Section

}
export const SensorSchema=SchemaFactory.createForClass(Sensor)  