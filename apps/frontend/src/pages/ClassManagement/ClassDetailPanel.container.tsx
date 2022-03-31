import { ModalRef } from 'components';
import {
  CreateOrUpdateClassLabModal,
  useCreateOrUpdateClassLabOptions,
} from 'components/CreateClassLabButton';
import isNil from 'lodash/isNil';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ClassLab } from 'shared/models';
import ClassDetailPanelView from './ClassDetailPanel.view';
import ClassDetailPanelWrapper from './ClassDetailPanelWrapper';
import {
  useCurrentClassDetail,
  useIsUpdatingClassLab,
  useSetCurrentDetailClassId,
  useUpdateClassLabHandler,
  useUpdateClassLabState,
  useUpdateClassLabStatus,
} from './ClassesGrid.hooks';
import { useHandleDeleteClassLab } from './ClassesGrid.hooks/useHandleDeleteClassLab';

const ClassDetailPanelContainer: React.FC = () => {
  const currentClass = useCurrentClassDetail();
  const editClassLabModalRef = useRef<ModalRef>(null);
  const setCurrentDetailClassId = useSetCurrentDetailClassId();
  const { classOptions, labOptions } = useCreateOrUpdateClassLabOptions();

  const [editingClassLab, setEditingClassLab] = useState<ClassLab>();

  const onClosePanel = useCallback(() => {
    setCurrentDetailClassId(null);
  }, [setCurrentDetailClassId]);

  const handleEditClassLab = useCallback((classLab: ClassLab) => {
    setEditingClassLab(classLab);
    if (editClassLabModalRef.current) {
      editClassLabModalRef.current.open();
    }
  }, []);

  const { disabledFields, initialUpdateClassLabValues } =
    useUpdateClassLabState({
      editingClassLab,
      currentClass,
    });

  const isUpdatingClassLab = useIsUpdatingClassLab();
  const updateClassLabStatus = useUpdateClassLabStatus();
  const updateClassLab = useUpdateClassLabHandler({
    isUpdatingClassLab,
    disabledFields,
    updateClassLabStatus,
  });

  const handleDeleteClassLab = useHandleDeleteClassLab(currentClass);

  useEffect(() => {
    if (!isNil(updateClassLabStatus)) {
      editClassLabModalRef.current && editClassLabModalRef.current.close();
    }
  }, [updateClassLabStatus]);

  return (
    <ClassDetailPanelWrapper open={Boolean(currentClass)}>
      {!isNil(currentClass) && (
        <ClassDetailPanelView
          onClose={onClosePanel}
          currentClass={currentClass}
          handleEditClassLab={handleEditClassLab}
          handleDeleteClassLab={handleDeleteClassLab}
        />
      )}
      <CreateOrUpdateClassLabModal
        labOptions={labOptions}
        classOptions={classOptions}
        modalRef={editClassLabModalRef}
        isLoading={isUpdatingClassLab}
        editingClassLab={initialUpdateClassLabValues}
        onSubmit={updateClassLab}
        disabledFields={disabledFields}
      />
    </ClassDetailPanelWrapper>
  );
};

export default React.memo(ClassDetailPanelContainer);
