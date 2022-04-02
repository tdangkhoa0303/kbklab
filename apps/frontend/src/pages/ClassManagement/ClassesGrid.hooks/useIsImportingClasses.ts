import {useLoading} from 'shared/hooks';
import {importClasses} from '../ClassesGrid.thunks';

export const useIsImportingClasses = () => useLoading([importClasses]);
