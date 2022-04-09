import {ColDef, ValueGetterFunc} from 'ag-grid-community';
import {getLabScore} from 'components/LabAttemption/LabCard/LabCard.hooks';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import {useMemo} from 'react';
import {Class, Lab, ScoreRecord} from 'shared/models';

export const createScoreValueGetter =
  (lab: Lab): ValueGetterFunc =>
  (params): number | null => {
    const { colDef, data } = params;
    const { field } = colDef;
    const { steps } = lab;

    if (!field) {
      return null;
    }

    const { stepSuccess, attempt } = get(data, field, {}) as ScoreRecord;
    if (isNil(stepSuccess) || isNil(attempt)) {
      return null;
    }

    return getLabScore(steps, stepSuccess);
  };

export const useClassScoreGridColDefs = (currentClass: Class): ColDef[] => {
  const { classLabs } = currentClass;

  const scoreColDefs = useMemo(
    () =>
      Object.values(classLabs).map((classLab, index): ColDef => {
        const { id, lab } = classLab;

        return {
          headerName: (lab.title.split(':')[0] || '').toUpperCase(),
          headerTooltip: lab.title,
          field: `scores.${id}`,
          valueGetter: createScoreValueGetter(lab),
          minWidth: 124,
          maxWidth: 124,
        };
      }),
    [classLabs]
  );

  return useMemo(
    () => [
      {
        field: 'class',
        headerName: 'Class',
        minWidth: 104,
        maxWidth: 104,
      },
      {
        field: 'code',
        headerName: 'RollNumber',
        minWidth: 120,
        maxWidth: 120,
      },
      {
        field: 'name',
        headerName: 'FullName',
        minWidth: 256,
      },
      {
        field: 'email',
        headerName: 'Email',
        minWidth: 256,
      },
      ...scoreColDefs,
    ],
    [scoreColDefs]
  );
};
