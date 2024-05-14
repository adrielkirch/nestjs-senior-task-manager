import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';


@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class TaskModel extends Document {
  @Prop({
    default: () => randomUUID(),
  })
  _id: string;

  @Prop({
    required: true,
  })
  teamId: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  text: string;

  @Prop()
  expirationDate: Date;

  @Prop()
  remindDate: Date;

  @Prop({
    type: String, 
    default: 'TODO',
  })
  status: string;

  @Prop()
  assignTo: string;

  @Prop()
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

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
