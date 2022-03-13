import * as crypto from 'crypto';
import {User, UserRole} from 'entities';
import {CallbackWithoutResultAndOptionalError, Model, model, Schema} from 'mongoose';
import validator from 'validator';

const schema: Schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    role: {
      type: Number,
      enum: UserRole,
      default: UserRole.Student,
      required: true,
    },
  }
);

schema.pre<User>('save', async function (next: CallbackWithoutResultAndOptionalError) {
  if (this.password) {
    this.password = crypto.createHash('sha256').update(this.password).digest('hex');
  }
  next();
});

schema.methods.comparePassword = function (candidatePassword: string, userPassword: string) {
  const inputPassword = crypto.createHash('sha256').update(candidatePassword).digest('hex');
  return inputPassword === userPassword;
};

export const UserModel: Model<User> = model('User', schema);
