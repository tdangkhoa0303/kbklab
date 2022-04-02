import {useSelector} from 'react-redux';
import {ResponseStatus} from 'shared/constants';
import {attemptLabStatusSelector} from '../selectors';

export const useAttemptLabStatus = (): ResponseStatus | null =>
  useSelector(attemptLabStatusSelector);
