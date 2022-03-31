import { useMemo } from 'react';
import { useUser } from 'shared/hooks';
import { UserRole } from 'shared/models';
import { importClassesInitialValues } from '../ClassesGrid.constants';
import { ImportClassesFormValues } from '../ClassesGrid.types';
import { useDefaultLecturerOption } from './useDefaultLecturerOption';

export const useImportClassInitialValues = (): ImportClassesFormValues => {
  const user = useUser();
  const defaultOption = useDefaultLecturerOption();

  return useMemo(() => {
    if (user.role >= UserRole.HeadDepartment) {
      return importClassesInitialValues;
    }

    return {
      ...importClassesInitialValues,
      lecturerId: defaultOption.value,
    };
  }, [defaultOption, user]);
};
