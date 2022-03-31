import { useSelector } from 'react-redux';
import { ResponseStatus } from 'shared/constants';
import { finishLabStatusSelector } from '../selectors';

export const useFinishLabStatus = (): ResponseStatus | null =>
  useSelector(finishLabStatusSelector);
