import {useSelector} from 'react-redux';
import {importLecturersStatusSelector} from '../LecturersGrid.selectors';

export const useImportLecturersStatus = () =>
  useSelector(importLecturersStatusSelector);
