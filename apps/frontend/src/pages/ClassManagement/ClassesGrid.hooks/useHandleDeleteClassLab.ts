import {useConfirmationModal} from 'components/ConfirmationModal';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {ResponseStatus} from 'shared/constants';
import {useLoadingToast} from 'shared/hooks';
import {Class} from 'shared/models';
import {deleteClassLabStatusSelector} from '../ClassesGrid.selectors';
import {useDeleteClassLab} from './useDeleteClassLab';
import {useIsDeletingClassLab} from './useIsDeletingClassLab';

export const useDeleteClassLabStatus = (): ResponseStatus | null =>
  useSelector(deleteClassLabStatusSelector);

export type HandleDeleteClassLab = (classLabId: string) => void;

export const useHandleDeleteClassLab = (
  currentClass: Class | undefined
): HandleDeleteClassLab => {
  const deleteClassLab = useDeleteClassLab();
  const { showConfirmation } = useConfirmationModal();

  const deleteClassLabStatus = useDeleteClassLabStatus();
  const isDeletingClassLab = useIsDeletingClassLab();
  const { showToast } = useLoadingToast({
    loading: isDeletingClassLab,
    status: deleteClassLabStatus,
    successMessage: 'Success deleted class lab',
    errorMessage: 'Failed deleting class lab',
    loadingMessage: 'Deleting class lab',
  });

  return useCallback(
    (classLabId: string) => {
      if (!currentClass) {
        return;
      }

      const onConfirmDeleteClassLab = () => {
        showToast();
        deleteClassLab({
          classId: currentClass.id,
          classLabId,
        });
      };

      showConfirmation({
        title: 'Delete class Lab?',
        content: 'Are you sure to delete this class lab?',
        onConfirm: onConfirmDeleteClassLab,
      });
    },
    [currentClass, deleteClassLab, showToast]
  );
};
