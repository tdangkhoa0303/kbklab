import {GridContextValues} from 'components';
import get from 'lodash/get';
import {MutableRefObject, useCallback} from 'react';
import {useDispatchWithToast} from 'shared/hooks';
import {deleteClassesThunk} from '../ClassesGrid.thunks';
import {useDeleteClassesStatus} from './useDeleteClassesStatus';

export const useDeleteClasses = (gridRef: MutableRefObject<GridContextValues | null>): VoidFunction => {
  const deleteClassesStatus = useDeleteClassesStatus();
  const deleteClasses = useDispatchWithToast({
    thunkAction: deleteClassesThunk,
    toastParams: {
      successMessage: 'Classes deleted successful',
      loadingMessage: 'Deleting classes',
      errorMessage: 'Failed classes deletion',
      status: deleteClassesStatus
    }
  })

  return useCallback(() => {
    const gridApi = get<GridContextValues, 'gridApi', null>(gridRef.current, 'gridApi', null);
    if(!gridApi) {
      return;
    }

    const selectedRows = gridApi.getSelectedRows();
    const classes = selectedRows.map(row => row.id);
    return !!classes.length && deleteClasses({classes})
  }, [deleteClasses, gridRef])
}
