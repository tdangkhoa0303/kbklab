import { useSelector } from 'react-redux';
import { importClassesStatusSelector } from '../ClassesGrid.selectors';

export const useImportClassesStatus = () =>
  useSelector(importClassesStatusSelector);
