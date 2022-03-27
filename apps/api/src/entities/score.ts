import {ObjectId} from 'mongoose';
import {BaseEntity} from './base-entity';

export interface Score extends BaseEntity {
  user: ObjectId;
  classLab: ObjectId;
  stepSuccess: boolean[][];
  attempt: number;
}
