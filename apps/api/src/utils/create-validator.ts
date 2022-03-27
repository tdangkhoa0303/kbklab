import isEmpty from 'lodash/isEmpty';
import {AppError, ConstraintErrorCode, ValidationError} from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldValidator<TValues extends object = object> = (field: any, values: TValues) => Promise<ConstraintErrorCode | null>;

export type ValidatorsByField<TValues extends object> = Partial<{
  [key in keyof TValues]: FieldValidator<TValues>[]
}>;

export type Validator<TValues extends object> = (values: TValues) => Promise<void>;

export const createValidator = <TValues extends object>(validatorsByField: ValidatorsByField<TValues>): Validator<TValues> => (
  async (values) => {
    const errors: ValidationError<TValues> = Object
      .entries<FieldValidator<TValues>[]>(validatorsByField)
      .reduce(async (result, [key, validators]) => {
        let errorCode: ConstraintErrorCode;
        for (let i = 0; i < validators.length; i++) {
          if (errorCode) {
            return {
              ...result,
              [key]: errorCode
            }
          }

          errorCode = await validators[i](values[key], values);
        }

        return result;
      }, {});
    if(!isEmpty(errors)) {
      throw new AppError<ValidationError<TValues>>('Invalid payload', 400, errors);
    }
  }
)
