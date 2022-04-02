import {getLabStatus} from 'components/LabAttemption/LabCard/LabCard.utils';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {ClassLab} from 'shared/models';
import {LabStatusPriority} from '../LabsGrid.constants';
import {allStudentLabsSelector} from '../LabsGrid.selectors';

export const useSortedStudentLabs = (): ClassLab[] => {
  const studentLabByIds = useSelector(allStudentLabsSelector);

  return useMemo(
    () =>
      Object.values(studentLabByIds).sort((classLab, nextClassLab) => {
        const labStatus = getLabStatus(classLab);
        const nextLabStatus = getLabStatus(nextClassLab);

        return (
          LabStatusPriority[nextLabStatus] - LabStatusPriority[labStatus] ||
          classLab.lab.title.localeCompare(nextClassLab.lab.title)
        );
      }),
    [studentLabByIds]
  );
};
