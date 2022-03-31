import { useMemo } from 'react';
import { Option } from 'shared/constants';
import { useUser } from 'shared/hooks';
import { UserRole } from 'shared/models';
import { useAllLecturers } from '../../LecturerManagement/LecturersGrid.hooks';
import { useDefaultLecturerOption } from './useDefaultLecturerOption';

export const useLecturerOptions = (): Option[] => {
  const user = useUser();
  const allLecturers = useAllLecturers();
  const defaultOption = useDefaultLecturerOption();

  return useMemo(() => {
    if (user && user.role < UserRole.HeadDepartment) {
      return [defaultOption];
    }

    return allLecturers.map(({ name, id: lecturerId }) => ({
      label: name,
      value: lecturerId,
    }));
  }, [allLecturers]);
};
