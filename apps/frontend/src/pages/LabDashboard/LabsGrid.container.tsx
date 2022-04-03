import React from 'react';
import {useMounting} from 'shared/hooks';
import {useFetchUserClassLabs, useSortedStudentLabs} from './LabsGrid.hooks';
import LabsGridView from './LabsGrid.view';

const LabsGrid: React.FC = () => {
  const fetchUserClassLabs = useFetchUserClassLabs();
  const classLabs = useSortedStudentLabs();

  useMounting(() => {
    fetchUserClassLabs();
  });

  return <LabsGridView classLabs={classLabs} />;
};

export default LabsGrid;
