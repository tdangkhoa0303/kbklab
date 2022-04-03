import {ObjectId} from 'mongoose';
import {BaseEntity} from './base-entity';

export interface ClassLab extends BaseEntity {
  lab: ObjectId;
  startDate: Date;
  endDate: Date;
  class: ObjectId;
  name: string;
}
