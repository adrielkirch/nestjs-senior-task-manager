import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';
import { Status } from "src/domain/task/types";

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

  @Prop({
    default: Date.now,
  })
  created: Date;

  @Prop({
    default: Date.now,
  })
  updated: Date;

  @Prop()
  expirationDate: Date;

  @Prop()
  remindDate: Date;

  @Prop({
    type: String, // Specify type as String
    enum: ["DONE", "IN-PROGRESS", "TODO", "ARCHIVED"],
    default: "TODO",
  })
  status: Status;

  @Prop()
  assignTo: string;

  @Prop()
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
