import {UserRole} from '@kbklab/api-interfaces';
import {BaseEntity} from './base-entity';

export interface User extends BaseEntity {
  name: string;
  code: string;
  email: string;
  password?: string;
  role: UserRole;

  comparePassword: (userPassword: string, candidatePassword: string) => Promise<boolean>;
}
