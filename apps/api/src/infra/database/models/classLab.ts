import {ClassLab} from 'entities';
import {model, Model, Schema, Types} from 'mongoose';

const classLabSchema: Schema = new Schema<ClassLab>(
  {
    lab: {
      type: Types.ObjectId,
      ref: 'Lab',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    class: {
      type: Types.ObjectId,
      ref: 'Class',
      required: true,
    },
  }
);

export const ClassLabModel: Model<ClassLab> = model<ClassLab>('ClassLab', classLabSchema);
