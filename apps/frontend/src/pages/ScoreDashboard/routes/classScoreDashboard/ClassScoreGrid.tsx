import {Grid, GridProps} from 'components';
import React, {useEffect, useState} from 'react';
import {Class, StudentScore} from 'shared/models';
import {APIClient} from 'shared/utilities';
import {useClassScoreGridColDefs} from '../../hooks';

export interface ClassScoreGridProps extends GridProps {
  currentClass: Class;
}

const ClassScoreGrid: React.FC<ClassScoreGridProps> = ({
  currentClass,
  ...props
}) => {
  const columnDefs = useClassScoreGridColDefs(currentClass);
  const [studentScores, setStudentScores] = useState<StudentScore[]>([]);

  useEffect(() => {
    APIClient.get(`scores/classScores?class=${currentClass.code}`).then(
      (response) => setStudentScores(response.data.data)
    );
  }, [currentClass]);

  return <Grid columnDefs={columnDefs} rowData={studentScores} {...props} />;
};

export default React.memo(ClassScoreGrid);
