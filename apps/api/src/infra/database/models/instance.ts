import {Instance} from 'entities';
import {model, Model, Schema, Types} from 'mongoose';

const instanceSchema: Schema = new Schema<Instance>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    instanceUrl: {
      type: String,
      required: true,
    },
    classLab: {
      type: Types.ObjectId,
      ref: 'ClassLab',
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    containerId: {
      type: String,
      required: true,
    },
  }
);

export const InstanceModel: Model<Instance> = model<Instance>('Instance', instanceSchema);
