
import { randomUUID } from 'crypto';

export type ProfileProps = {
  userId?: string;
  biography?: string;
  notifications?: string[];
  gender?: string;
  image?: string;
};

export class Profile {
  public readonly id: string;
  public props: ProfileProps;
  private constructor(props: ProfileProps, id?: string) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
    };
  }

  static create(props: ProfileProps, id?: string): Profile {
    return new Profile(props, id);
  }

  updateBiograpyhy(biography: string) {
    this.biography = biography;
  }

  get biography() {
    return this.props.biography;
  }

  set biography(value: string) {
    this.props.biography = value;
  }


  updateNotifications(notifications: string[]) {
    this.props.notifications = notifications;
  }

  get notifications() {
    return this.props.notifications;
  }

  set notifications(value: string[]) {
    this.props.notifications = value;
  }

  updateImage(value: string) {
    this.props.image = value;
  }

  get image() {
    return this.props.image;
  }

  set image(value: string) {
    this.props.image = value;
  }

  updateGender(value: string) {
    this.props.gender = value;
  }

  get gender() {
    return this.props.gender;
  }

  set gender(value: string) {
    this.props.gender = value;
  }


  updateUserId(value: string) {
    this.props.userId = value;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
