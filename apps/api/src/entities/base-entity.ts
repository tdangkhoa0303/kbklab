import {Document} from 'mongoose';

export interface BaseEntity extends Document {
  id: string;
}
