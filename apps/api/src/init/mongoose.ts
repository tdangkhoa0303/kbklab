import {environment} from 'environments/environment'
import mongoose, {ConnectOptions} from 'mongoose';

const {dbName, dbURI} = environment;

export const removeObjectIdFromDoc = (doc, ret) => delete ret._id;

export default () => {
  mongoose.connect(dbURI, {
    dbName,
    ignoreUndefined: true,
    useUnifiedTopology: true
  } as ConnectOptions);

  // Custom mongoose configurations
  mongoose.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id
    }
  });

  mongoose.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id
    }
  });
}
