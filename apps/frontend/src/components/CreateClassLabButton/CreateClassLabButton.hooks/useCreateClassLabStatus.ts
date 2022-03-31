import { useSelector } from 'react-redux';
import { ResponseStatus } from 'shared/constants';
import { createClassLabStatusSelector } from '../CreateClassLabButton.selectors';

export const useCreateClassLabStatus = (): ResponseStatus | null =>
  useSelector(createClassLabStatusSelector);
