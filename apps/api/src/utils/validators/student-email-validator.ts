import {ConstraintErrorCode} from 'models';
import {FieldValidator} from '../create-validator';
import {fuStudentEmailRegex} from '../regex/fu-email-regex';

export const studentEmailValidator: FieldValidator = async (value: string) => value.match(fuStudentEmailRegex) ? null : ConstraintErrorCode.Invalid;
