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
    let errors: ValidationError<TValues> = {};
    for(const [field, validators] of Object.entries<FieldValidator<TValues>[]>(validatorsByField)) {
      for (let i = 0; i < validators.length; i++) {
        const errorCode = await validators[i](values[field], values);
        if(errorCode) {
          errors = {
            ...errors,
            [field]: errorCode,
          }
          break;
        }
      }
    }

    if(!isEmpty(errors)) {
      throw new AppError<ValidationError<TValues>>('Invalid payload', 400, errors);
    }
  }
)
