
import { randomUUID } from 'crypto';

export type TeamProps = {
  name?: string;
  userId?: string;
};

export class Team {
  public readonly id: string;
  public props: TeamProps;
  private constructor(props: TeamProps, id?: string) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
    };
  }

  static create(props: TeamProps, id?: string): Team {
    return new Team(props, id);
  }

  updateName(name: string) {
    this.name = name;
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
