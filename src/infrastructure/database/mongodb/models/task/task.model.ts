import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';
import { StatusEnum } from "../../../../../domain/task/types";

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
    enum: ["DONE", "IN-PROGRESS", "TODO", "ARCHIVED"],
    default: "TODO",
  })
  status: StatusEnum;

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
