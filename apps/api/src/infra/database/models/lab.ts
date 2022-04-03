import {Lab} from 'entities';
import {model, Model, Schema} from 'mongoose';

const labSchema: Schema = new Schema<Lab>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    guide: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      select: false,
    },
    steps: [
      {
        description: {
          type: String,
          required: true,
        },
        point: {
          type: Number,
          required: true,
        },
      },
    ],
    disabled: {
      type: Boolean,
      require: true,
    },
  }
);

export const LabModel: Model<Lab> = model<Lab>('Lab', labSchema);
