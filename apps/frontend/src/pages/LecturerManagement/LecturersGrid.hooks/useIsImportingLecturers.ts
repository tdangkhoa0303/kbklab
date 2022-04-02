import {useLoading} from 'shared/hooks';
import {importLecturers} from '../LecturersGrid.thunks';

export const useIsImportingLecturers = () => useLoading([importLecturers]);
