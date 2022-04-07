import React from 'react';
import {useSortedStudentLabs} from './LabsGrid.hooks';
import LabsGridView from './LabsGrid.view';

const LabsGrid: React.FC = () => {
  const classLabs = useSortedStudentLabs();

  return <LabsGridView classLabs={classLabs} />;
};

export default LabsGrid;
