import { randomUUID } from 'crypto';

export interface CommentProps {
  text?: string;
  userId?: string;
  taskId?: string;
}

export class Comment {
  public readonly id: string;
  public props: CommentProps;

  constructor(props: CommentProps, id: string = randomUUID()) {
    this.id = id;
    this.props = { ...props };
  }

  static create(props: CommentProps, id?: string): Comment {
    return new Comment(props, id);
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

  updateUserId(userId: string) {
    this.props.userId = userId;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  updateTaskId(taskId: string) { 
    this.props.taskId = taskId;
  }

  get taskId() {
    return this.props.taskId;
  }

  set taskId(value: string) {
    this.props.taskId = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
