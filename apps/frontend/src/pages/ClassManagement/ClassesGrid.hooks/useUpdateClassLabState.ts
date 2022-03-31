import { DisabledFields } from 'components';
import moment from 'moment';
import { useMemo } from 'react';
import { Class, ClassLab } from 'shared/models';

export interface UseUpdateClassLabStateParams {
  editingClassLab: ClassLab | undefined;
  currentClass: Class | undefined;
}

export interface UpdateClassLabState {
  disabledFields: DisabledFields;
  initialUpdateClassLabValues: ClassLab | undefined;
}

export const useUpdateClassLabState = (
  params: UseUpdateClassLabStateParams
): UpdateClassLabState => {
  const { currentClass, editingClassLab } = params;

  const initialUpdateClassLabValues = useMemo(() => {
    if (!currentClass || !editingClassLab) {
      return undefined;
    }

    return {
      ...editingClassLab,
      class: currentClass.id,
    };
  }, [currentClass, editingClassLab]);

  const disabledFields = useMemo((): DisabledFields => {
    if (!editingClassLab) {
      return {};
    }
    const { startDate, endDate } = editingClassLab;
    const currentDate = moment();
    const isClassLabStarted = currentDate.isAfter(startDate);

    return {
      labId: true,
      classId: true,
      startDate: isClassLabStarted,
      endDate: currentDate.isAfter(endDate),
    };
  }, [editingClassLab]);

  return useMemo(
    () => ({
      disabledFields,
      initialUpdateClassLabValues,
    }),
    [disabledFields, initialUpdateClassLabValues]
  );
};
