import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';


@Schema({
  collection: 'comments',
  timestamps: true,
})
export class CommentModel extends Document {
  @Prop({
    default: () => randomUUID(),
  })
  _id: string;

  @Prop({
    required: true,
  })
  text: string;

  @Prop({
    required: true,
  })
  taskId: string;

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

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
