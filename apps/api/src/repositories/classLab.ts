import {Document, ObjectId} from 'mongoose';

export interface ClassLab extends Document {
  lab: ObjectId;
  startDate: Date;
  endDate: Date;
  class: ObjectId;
  name: string;
}


const schema: mongoose.Schema = new mongoose.Schema<IClassLab>(
  {
    lab: {
      type: ObjectId,
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
      type: ObjectId,
      ref: 'Class',
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

const ClassLab: mongoose.Model<IClassLab> = mongoose.model<IClassLab>('ClassLab', schema);

export default ClassLab;
