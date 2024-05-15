import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({
  collection: 'profiles',
  timestamps: true,
})
export class ProfileModel {
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
    type: String,
    required: true,
  })
  notifications: string[];

  @Prop({
    type: String,
    required: true,
  })
  gender: string;

  @Prop({
    type: String,
    required: true,
  })
  image: string;

  @Prop({
    type: String,
    required: true,
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

  get id(): string {
    return this._id;
  }
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileModel);
