import {Lab} from 'shared/models';
import {useAppSelector} from 'shared/hooks';
import {studentLabsSelector} from '../StudentDashboard.selectors';

export const useStudentLabs = (): Lab[] => useAppSelector(studentLabsSelector);