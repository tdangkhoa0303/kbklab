import {ResponseStatus} from 'shared/constants';
import {useAppSelector} from 'shared/hooks';
import {createLabInstanceStatusSelector} from '../StudentDashboard.selectors';

export const useCreateLabInstanceStatus = (): ResponseStatus | null => useAppSelector(createLabInstanceStatusSelector);