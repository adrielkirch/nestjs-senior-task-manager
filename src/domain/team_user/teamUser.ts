import { randomUUID } from 'crypto';

export type TeamUserProps = {
  userId: string;
  teamId: string;
};

export class TeamUser {
  public readonly id: string;
  public props: TeamUserProps;
  private constructor(props: TeamUserProps, id?: string) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
    };
  }

  static create(props: TeamUserProps, id?: string): TeamUser {
    return new TeamUser(props, id);
  }

  updateUserId(userId: string) {
    this.props.userId = userId;
  }

  updateTeamId(teamId: string) {
    this.props.teamId = teamId;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  get teamId() {
    return this.props.teamId;
  }

  set teamId(value: string) {
    this.props.teamId = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
