import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

@Schema({
  collection: 'profiles',
  timestamps: true,
})
export class ProfileModel extends Document {
  @Prop({
    type: String,
    default: () => randomUUID(),
  })
  _id!: string;

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: [String],
    required: true,
  })
  notifications: string[];

  @Prop({
    type: String,
    required: false,
  })
  gender: string;

  @Prop({
    type: String,
    required: false,
  })
  image: string;

  @Prop({
    type: String,
    required: false,
  })
  biography: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileModel);
