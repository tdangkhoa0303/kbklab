import isNil from 'lodash/isNil';
import React from 'react';
import {useOutletContext} from 'react-router-dom';
import {useSizeColumnsToFit} from '../../../components';
import {useClassByCode} from '../../ClassManagement/ClassesGrid.hooks';
import {ScoreDashboardOutletContextValues} from '../types';
import ClassScoreGrid from './classScoreDashboard/ClassScoreGrid';

const ClassScoreDashboard: React.FC = () => {
  const { classCode, obtainGridValues } =
    useOutletContext<ScoreDashboardOutletContextValues>();
  const currentClass = useClassByCode(classCode);
  const autoSizeColumns = useSizeColumnsToFit();

  return !isNil(currentClass) ? (
    <ClassScoreGrid
      currentClass={currentClass}
      onGridReady={obtainGridValues}
      onPaginationChanged={autoSizeColumns}
    />
  ) : null;
};

export default React.memo(ClassScoreDashboard);
