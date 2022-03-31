import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { CreateClassLabValues } from '../CreateClassLabButton.types';

export const minimumStartDateFromNowInMinutes = 5;

export const minimumEndDateFromStartDateInMinutes = 30;

export const createClassLabSchema: SchemaOf<CreateClassLabValues> =
  Yup.object().shape({
    classId: Yup.string().required('Please assign a class'),
    labId: Yup.string().required('Please choose lab to create'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
    id: Yup.string(),
  });
