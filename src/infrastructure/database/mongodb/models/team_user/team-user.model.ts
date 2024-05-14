import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';


@Schema({
  collection: 'teamUser',
  timestamps: true,
})
export class TeamUserModel extends Document {
  @Prop({
    default: () => randomUUID(),
  })
  _id: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop()
  teamId: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const TeamUserSchema = SchemaFactory.createForClass(TeamUserModel);
