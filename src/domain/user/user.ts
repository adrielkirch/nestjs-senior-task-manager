
import { randomUUID } from 'crypto';

export type UserProps = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  role?: string; 
  phone?: string; 
};

export class User {
  public readonly id: string;
  public props: UserProps;
  private constructor(props: UserProps, id?: string) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
    };
  }

  static create(props: UserProps, id?: string): User {
    return new User(props, id);
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

  updateSurname(surname: string) {
    this.surname = surname;
  }

  get surname() {
    return this.props.surname;
  }

  set surname(value: string) {
    this.props.surname = value;
  }

  updateEmail(email: string) {
    this.email = email;
  }

  get email() {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  updatePassword(password: string) {
    this.password = password;
  }

  get password() {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  get role() {
    return this.props.role; 
  }
  set role(value: string) {
    this.props.role = value; 
  }

  updatePhone(phone: string) {
    this.phone = phone;
  }
  get phone() {
    return this.props.phone;
  }

  set phone(value: string) {
    this.props.phone = value; 
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
