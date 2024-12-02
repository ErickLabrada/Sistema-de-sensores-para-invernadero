import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Data } from './data.schema';

@Schema()
export class Section {
  @Prop({
    required: true,
  })
  name: string

  @Prop({
    type:[Data],
    default: [],
    required: true,
  })
  data: Data[]

}
export const SectionSchema=SchemaFactory.createForClass(Section)  