import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema({
  timestamps: true,
})
export class Url {
  @Prop({
    unique: true,
    required: true
  })
  url: string;

  @Prop({
    unique: true,
    required: true
  })
  shortUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
