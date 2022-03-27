import {User} from 'entities';
import {UserModel} from 'infra/database/models';
import {Query} from 'mongoose';

export const findUserByEmail = (email: string): Query<User, User, object, User> => UserModel.findOne({email});

export const findUserByEmailIncludePassword = (email: string): Query<User, User, object, User> => findUserByEmail(email).select('+password')
