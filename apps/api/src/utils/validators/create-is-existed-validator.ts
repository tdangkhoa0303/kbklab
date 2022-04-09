import {isNil} from 'lodash';
import {ConstraintErrorCode} from 'models';
import {Model} from 'mongoose';

export type IsExistedByIdValidator = (id: string) => Promise<ConstraintErrorCode | null>

export const createIsExistedByIdValidator = <TEntity>(model: Model<TEntity>): IsExistedByIdValidator => {
  return async (id): Promise<ConstraintErrorCode | null> => isNil(await model.findById(id)) ? ConstraintErrorCode.NotExisted: null
}
