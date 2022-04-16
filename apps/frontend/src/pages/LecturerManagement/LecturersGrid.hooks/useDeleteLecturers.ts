import {GridContextValues} from 'components';
import get from 'lodash/get';
import {MutableRefObject, useCallback} from 'react';
import {useDispatchWithToast} from 'shared/hooks';
import {deleteLecturersThunk} from '../LecturersGrid.thunks';
import {useDeleteLecturersStatus} from './useDeleteLecturersStatus';

export const useDeleteLecturers = (gridRef: MutableRefObject<GridContextValues | null>): VoidFunction => {
  const deleteClassesStatus = useDeleteLecturersStatus();
  const deleteClasses = useDispatchWithToast({
    thunkAction: deleteLecturersThunk,
    toastParams: {
      successMessage: 'Lecturers deleted successful',
      loadingMessage: 'Deleting lecturers',
      errorMessage: 'Failed lecturers deletion',
      status: deleteClassesStatus
    }
  })

  return useCallback(() => {
    const gridApi = get<GridContextValues, 'gridApi', null>(gridRef.current, 'gridApi', null);
    if(!gridApi) {
      return;
    }

    const selectedRows = gridApi.getSelectedRows();
    const lecturers = selectedRows.map(row => row.id);
    return !!lecturers.length && deleteClasses({lecturers})
  }, [deleteClasses, gridRef])
}
