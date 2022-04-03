import {Class} from './Class';

export enum UserRole {
  Student,
  Lecturer,
  HeadDepartment,
  Admin,
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Lecturer extends User {
  classes: Class[];
}

export interface Student extends User {
  class: string;
}
