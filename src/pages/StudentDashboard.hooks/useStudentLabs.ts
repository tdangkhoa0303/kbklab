import {Lab} from 'shared/models';
import {useAppSelector} from 'shared/hooks';
import {studentLabByIdsSelector} from '../StudentDashboard.selectors';
import {useMemo} from 'react';
import {Dictionary} from '@reduxjs/toolkit';

export const useStudentLabs = (): Lab[] => {
	const studentLabByIds: Dictionary<Lab> = useAppSelector(studentLabByIdsSelector);
	return useMemo(() => Object.values(studentLabByIds) as Lab[], [studentLabByIds]);
};