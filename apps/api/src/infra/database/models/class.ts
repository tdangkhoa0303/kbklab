import {Class} from 'entities';
import {Model, model, Schema, Types} from 'mongoose';

const classSchema: Schema<Class> = new Schema<Class>(
  {
    students: [
      {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    code: {
      type: String,
      required: true,
      unique: true,
    },
    lecturer: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

classSchema.index({
  code: 1,
  lecturer: 1,
})

export const ClassModel: Model<Class> = model<Class>('Class', classSchema);
