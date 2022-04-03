import {ObjectId} from 'mongoose';
import {BaseEntity} from './base-entity';

export interface Class extends BaseEntity {
  students: ObjectId[];
  code: string;
  lecturer: ObjectId;
  classLabs: ObjectId[]
}
