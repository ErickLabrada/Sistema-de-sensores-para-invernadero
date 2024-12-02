import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

@Schema()
export class Data {
  @Prop({
    required: true,
  })
  temperature: number

  @Prop({
    required: true,
  })
  humidity: number

  @Prop({ required: true, default: () => new Date() })
  time: Date;

}
export const DataSchema=SchemaFactory.createForClass(Data)  