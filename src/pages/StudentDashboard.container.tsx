import React, {useMemo} from 'react';
import {useMounting} from 'shared/hooks';
import {useFetchStudentLabs, useSearchText, useStudentLabs} from './StudentDashboard.hooks';
import StudentDashboardView from './StudentDashboard.view';
import {useCreateLabInstanceToast} from './StudentDashboard.hooks/useCreateLabInstanceToast';
import {LabStatusPriority} from './StudentDashboard.constants';
import {getLabStatus} from './studentDashboard/LabCard.utils';

const StudentDashboard: React.FC = () => {
	const fetchStudentLabs = useFetchStudentLabs();
	const studentLabByIds = useStudentLabs();
	const searchText = useSearchText();
	const onAttemptLab = useCreateLabInstanceToast();
	const sortedStudentLab = useMemo(() => (
		Object
			.values(studentLabByIds)
			.filter(lab => lab.title.includes(searchText))
			.sort((lab, nextLab) => {
				const labStatus = getLabStatus(!!lab.stepSuccess, lab.url);
				const nextLabStatus = getLabStatus(!!nextLab.stepSuccess, nextLab.url);

				return (
					LabStatusPriority[nextLabStatus] - LabStatusPriority[labStatus] ||
					lab.title.localeCompare(nextLab.title)
				)
			})
	), [searchText, studentLabByIds]);


	useMounting(() => {
		fetchStudentLabs();
	});

	return (
		<StudentDashboardView
			onAttempt={onAttemptLab}
			labs={sortedStudentLab}
		/>
	)
}

export default StudentDashboard;