import { randomUUID } from 'crypto';
import { StatusEnum } from "./types";

export interface TaskProps {
  title: string;
  text: string;
  expirationDate: Date;
  remindDate: Date;
  status: StatusEnum;
  assignTo: string;
  userId: string;
}

export class Task {
  public readonly id: string;
  public props: Required<TaskProps>;

  constructor(props: TaskProps, id: string = randomUUID()) {
    this.id = id;
    this.props = {
      ...props,
    };
  }

  static create(props: TaskProps, id?: string): Task {
    return new Task(props, id);
  }

  updateTitle(title: string) {
    this.props.title = title;
  }

  get title() {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  updateText(text: string) {
    this.props.text = text;
  }

  get text() {
    return this.props.text;
  }

  set text(value: string) {
    this.props.text = value;
  }

  updateExpirationDate(expirationDate: Date) {
    this.props.expirationDate = expirationDate;
  }

  get expirationDate() {
    return this.props.expirationDate;
  }

  set expirationDate(value: Date) {
    this.props.expirationDate = value;
  }

  updateRemindDate(remindDate: Date) {
    this.props.remindDate = remindDate;
  }

  get remindDate() {
    return this.props.remindDate;
  }

  set remindDate(value: Date) {
    this.props.remindDate = value;
  }

  updateStatus(status: StatusEnum) {
    this.props.status = status;
  }

  get status() {
    return this.props.status;
  }

  set status(value: StatusEnum) {
    this.props.status = value;
  }

  updateAssignTo(assignTo: string) {
    this.props.assignTo = assignTo;
  }

  get assignTo() {
    return this.props.assignTo;
  }

  set assignTo(value: string) {
    this.props.assignTo = value;
  }

  updateUserId(userId: string) {
    this.props.userId = userId;
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
