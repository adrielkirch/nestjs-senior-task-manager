import { randomUUID } from 'crypto';
import { StatusEnum } from "./types";

export class Task {
  public readonly _id: string;
  private _title: string;
  private _text: string;
  private _created: Date;
  private _updated: Date;
  private _expirationDate: Date;
  private _remindDate: Date;
  private _status: StatusEnum;
  private _assignTo: string;
  private _userId: string;

  constructor(
    _id: string = randomUUID(),
    title: string,
    text: string,
    created: Date,
    updated: Date,
    expirationDate: Date,
    remindDate: Date,
    status: StatusEnum,
    assignTo: string,
    userId: string
  ) {
    this._id = _id;
    this._title = title;
    this._text = text;
    this._created = created;
    this._updated = updated;
    this._expirationDate = expirationDate;
    this._remindDate = remindDate;
    this._status = status;
    this._assignTo = assignTo;
    this._userId = userId;
  }

  updateTitle(title: string) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  updateText(text: string) {
    this._text = text;
  }

  get text() {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  updateCreated(created: Date) {
    this._created = created;
  }

  get created() {
    return this._created;
  }

  set created(value: Date) {
    this._created = value;
  }

  updateUpdated(updated: Date) {
    this._updated = updated;
  }

  get updated() {
    return this._updated;
  }

  set updated(value: Date) {
    this._updated = value;
  }

  updateExpirationDate(expirationDate: Date) {
    this._expirationDate = expirationDate;
  }

  get expirationDate() {
    return this._expirationDate;
  }

  set expirationDate(value: Date) {
    this._expirationDate = value;
  }

  updateRemindDate(remindDate: Date) {
    this._remindDate = remindDate;
  }

  get remindDate() {
    return this._remindDate;
  }

  set remindDate(value: Date) {
    this._remindDate = value;
  }

  updateStatus(status: StatusEnum) {
    this._status = status;
  }

  get status() {
    return this._status;
  }

  set status(value: StatusEnum) {
    this._status = value;
  }

  updateAssignTo(assignTo: string) {
    this._assignTo = assignTo;
  }

  get assignTo() {
    return this._assignTo;
  }

  set assignTo(value: string) {
    this._assignTo = value;
  }

  updateUserId(userId: string) {
    this._userId = userId;
  }

  get userId() {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  toJSON() {
    return {
      _id: this._id,
      title: this._title,
      text: this._text,
      created: this._created,
      updated: this._updated,
      expirationDate: this._expirationDate,
      remindDate: this._remindDate,
      status: this._status,
      assignTo: this._assignTo,
      userId: this._userId
    };
  }
}
