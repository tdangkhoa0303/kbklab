import moment from 'moment';
import {useAllClasses} from 'pages/ClassManagement/ClassesGrid.hooks';
import {useMemo} from 'react';
import {EMPTY_STRING, Option} from 'shared/constants';
import {useOptions} from 'shared/hooks';
import {Class, ClassLab, Lab} from 'shared/models';
import {useAllLabs} from '../CreateClassLabButton.hooks';
import {CreateClassLabValues} from '../CreateClassLabButton.types';

export const useCreateClassLabInitialValues = (
  editingClassLab: ClassLab | undefined
): CreateClassLabValues => {
  const editingValues = useMemo((): Partial<CreateClassLabValues> => {
    if (!editingClassLab) {
      return {};
    }

    const {
      id,
      startDate,
      endDate,
      class: classId,
      lab: { id: labId },
    } = editingClassLab;
    return {
      id,
      startDate,
      endDate,
      classId,
      labId,
    };
  }, [editingClassLab]);

  return useMemo(() => {
    const currentDateTime = moment();
    const minStartDate = currentDateTime.add(5, 'minutes').toISOString();
    const minEndDate = currentDateTime.add(30, 'minutes').toISOString();

    return {
      labId: EMPTY_STRING,
      classId: EMPTY_STRING,
      startDate: minStartDate,
      endDate: minEndDate,
      ...editingValues,
    };
  }, [editingValues]);
};

export interface CreateOrUpdateClassLabOptions {
  classOptions: Option[];
  labOptions: Option[];
}
export const useCreateOrUpdateClassLabOptions =
  (): CreateOrUpdateClassLabOptions => {
    const allClasses = useAllClasses();
    const allLabs = useAllLabs();

    const classOptions = useOptions<Class, 'id'>({
      data: allClasses,
      labelKey: 'code',
      valueKey: 'id',
    });

    const labOptions = useOptions<Lab, 'id'>({
      data: allLabs,
      labelKey: 'title',
      valueKey: 'id',
    });

    return useMemo(
      () => ({
        labOptions,
        classOptions,
      }),
      [classOptions, labOptions]
    );
  };
