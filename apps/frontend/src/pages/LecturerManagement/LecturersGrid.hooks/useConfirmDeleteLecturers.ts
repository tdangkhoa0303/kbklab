import {useConfirmationModal} from 'components/ConfirmationModal';
import {MutableRefObject, useCallback} from 'react';
import {GridContextValues} from 'components';
import {useDeleteLecturers} from './useDeleteLecturers';

export const useConfirmDeleteLecturers = (gridRef: MutableRefObject<GridContextValues | null>): VoidFunction => {
  const {showConfirmation} = useConfirmationModal();
  const deleteLecturers = useDeleteLecturers(gridRef)

  return useCallback(() => {
    showConfirmation({
      title: 'Delete classes?',
      content: 'Are you sure to delete these lecturers. After the deletion, all their classes will be assigned to you.',
      onConfirm: deleteLecturers,
    });
  }, [deleteLecturers, showConfirmation]);
}
