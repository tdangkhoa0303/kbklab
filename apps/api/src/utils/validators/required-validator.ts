import isUndefined from 'lodash/isUndefined';
import {ConstraintErrorCode} from 'models';
import {FieldValidator} from '../create-validator';

export const requiredValidator: FieldValidator = async (value) => (isUndefined(value)) ? ConstraintErrorCode.Required : null
