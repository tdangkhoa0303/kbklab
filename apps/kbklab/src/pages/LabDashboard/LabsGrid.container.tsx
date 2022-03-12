import React from 'react';
import {useMounting} from 'shared/hooks';
import {useFetchStudentLabs, useSortedStudentLabs} from './LabsGrid.hooks';
import LabsGridView from './LabsGrid.view';

const LabsGrid: React.FC = () => {
	const fetchStudentLabs = useFetchStudentLabs();
	const classLabs = useSortedStudentLabs();

	useMounting(() => {
		fetchStudentLabs();
	});

	return <LabsGridView classLabs={classLabs} />;
};

export default LabsGrid;
