import {ObjectId} from 'mongoose';
import {BaseEntity} from './base-entity';

export interface Instance extends BaseEntity {
  user: ObjectId;
  instanceUrl: string;
  classLab: ObjectId;
  containerId: string;
  startTime: number;
  endTime: number;
}
