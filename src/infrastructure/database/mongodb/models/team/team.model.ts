import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';


@Schema({
  collection: 'teams',
  timestamps: true,
})
export class TeamModel extends Document {
  @Prop({
    default: () => randomUUID(),
  })
  _id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const TeamSchema = SchemaFactory.createForClass(TeamModel);
