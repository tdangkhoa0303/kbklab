import {Document, ObjectId, Schema, Types} from 'mongoose';
import {ClassLab} from './classLab';

export interface Class extends Document {
  students: ObjectId;
  code: string;
  lecturer: ObjectId;
  classLabs: ClassLab[];
}


const schema: Schema<Class> = new Schema<Class>(
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
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: {virtuals: true},
  },
);

const Class: mongoose.Model<IClass> = mongoose.model<IClass>('Class', schema);

export default Class;
