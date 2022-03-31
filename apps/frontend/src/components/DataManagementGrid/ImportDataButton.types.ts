import { FormikValues } from 'formik';

export type ImportDataFormValuesWithFile<
  TImportDataFormValues extends FormikValues = FormikValues
> = TImportDataFormValues & {
  files: FileList | null;
};
