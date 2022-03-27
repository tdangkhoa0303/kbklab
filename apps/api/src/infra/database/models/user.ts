import {UserRole} from '@kbklab/api-interfaces';
import * as crypto from 'crypto';
import {User} from 'entities';
import {CallbackWithoutResultAndOptionalError, Model, model, Schema} from 'mongoose';
import {getUserCode} from 'utils';
import validator from 'validator';

const userSchema: Schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
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

userSchema.pre<User>('save', async function (next: CallbackWithoutResultAndOptionalError) {
  if (this.password) {
    this.password = crypto.createHash('sha256').update(this.password).digest('hex');
  }
  next();
});

userSchema.virtual('code').get(function () {
  const {email, role} = this;
  return getUserCode(email, role);
});

userSchema.methods.comparePassword = function (candidatePassword: string, userPassword: string) {
  const inputPassword = crypto.createHash('sha256').update(candidatePassword).digest('hex');
  return inputPassword === userPassword;
};

export const UserModel: Model<User> = model('User', userSchema);
