import {PlaygroundInstance} from 'entities/playground-instance';
import {model, Model, Schema, Types} from 'mongoose';

const playgroundInstanceSchema: Schema = new Schema<PlaygroundInstance>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    playground: {
      type: Types.ObjectId,
      ref: 'Lab',
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
    instanceUrl: {
      type: String,
      required: true,
    }
  }
);

export const PlaygroundInstanceModel: Model<PlaygroundInstance> = model<PlaygroundInstance>('PlaygroundInstance', playgroundInstanceSchema);
