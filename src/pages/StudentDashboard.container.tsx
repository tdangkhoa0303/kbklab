import React, {useMemo} from 'react';
import {useMounting} from 'shared/hooks';
import {useFetchStudentLabs, useStudentLabs} from './StudentDashboard.hooks';
import partition from 'lodash/partition';
import {getLabStatus} from './studentDashboard/LabCard.utils';
import {LabStatus} from 'shared/constants';
import StudentDashboardView from './StudentDashboard.view';
import {useCreateLabInstanceToast} from './StudentDashboard.hooks/useCreateLabInstanceToast';

const StudentDashboard: React.FC = () => {
	const fetchStudentLabs = useFetchStudentLabs();
	const studentLabByIds = useStudentLabs();
	const [inProgressLabs, archivedLabs] = useMemo(() => (
		partition(Object.values(studentLabByIds), lab => getLabStatus(!!lab.stepSuccess, lab.url) === LabStatus.InProgress)
	), [studentLabByIds]);

	useCreateLabInstanceToast()
	useMounting(() => {
		fetchStudentLabs();
	});

	return (
		<StudentDashboardView
			inProgressLabs={inProgressLabs}
			archivedLabs={archivedLabs}
		/>
	)
}

export default StudentDashboard;