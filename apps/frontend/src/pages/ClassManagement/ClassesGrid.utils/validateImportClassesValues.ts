import {FormikErrors} from 'formik';
import {ImportClassesFormValues} from '../ClassesGrid.types';

const validateClassCode = (classCode: string | undefined): string => {
  if (!classCode) {
    return 'class code is required';
  }

  return classCode.match(/^[A-Z]{2}\d{4}$/g)
    ? ''
    : 'Follow the format IAxxxx. Ex: IA1403.';
};

export const validateImportClassesValues = (
  importValues: ImportClassesFormValues
): FormikErrors<ImportClassesFormValues> => {
  const { classCode, lecturerId } = importValues;
  let errors: FormikErrors<ImportClassesFormValues> = {};
  const classCodeError = validateClassCode(classCode);

  if (classCodeError) {
    errors = {
      ...errors,
      classCode: classCodeError,
    };
  }

  if (!lecturerId) {
    errors = {
      ...errors,
      lecturerId: 'class code is required',
    };
  }

  return errors;
};
