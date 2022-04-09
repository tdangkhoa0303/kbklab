import {ObjectId} from 'mongoose';
import {BaseEntity} from './base-entity';

export interface PlaygroundInstance extends BaseEntity {
  user: ObjectId;
  playground: ObjectId;
  instanceUrl: string;
  containerId: string;
  startTime: number;
  endTime: number;
}
