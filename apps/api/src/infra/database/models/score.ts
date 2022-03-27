import {Score} from 'entities';
import {Model, model, Schema, Types} from 'mongoose';

const scoreSchema: Schema<Score> = new Schema<Score>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    classLab: {
      type: Types.ObjectId,
      ref: 'ClassLab',
      required: true,
    },
    stepSuccess: [[Boolean]],
    attempt: {
      type: Number,
      required: true,
    },
  }
);

scoreSchema.index({
  code: 1,
  lecturer: 1,
})

export const ScoreModel: Model<Score> = model<Score>('Score', scoreSchema);
