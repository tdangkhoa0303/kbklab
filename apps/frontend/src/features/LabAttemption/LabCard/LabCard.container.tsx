import { ModalRef } from 'components';
import React, { MouseEventHandler, useCallback, useMemo, useRef } from 'react';
import { ClassLab } from 'shared/models';
import { useIsAttemptingLab } from '../hooks';
import { LabCardProvider } from './LabCard.context';
import { useOnAttemptLab, useOnFinishLab } from './LabCard.hooks';
import { getLabStatus } from './LabCard.utils';
import LabCardView from './LabCard.view';
import LabStepsModal from './labStepsModal/LabStepsModal';

const labCardDefaultProps = {
  isStudent: false,
};

export type LabCardDefaultProps = Readonly<typeof labCardDefaultProps>;

export interface LabCardContainerProps extends Partial<LabCardDefaultProps> {
  classLab: ClassLab;
  handleEditClassLab?: (classLab: ClassLab) => void;
  handleDeleteClassLab?: (classLabId: string) => void;
}

export type LabCardContainerPropsWithDefault = LabCardContainerProps &
  LabCardDefaultProps;

const LabCardContainer: React.FC<LabCardContainerProps> = (props) => {
  const { classLab, isStudent, handleEditClassLab, handleDeleteClassLab } =
    props as LabCardContainerPropsWithDefault;
  const { url: instanceUrl, id: classLabId, startDate, endDate } = classLab;
  const modalRef = useRef<ModalRef>(null);
  const isAttemptingLab = useIsAttemptingLab();
  const labStatus = useMemo(
    () =>
      getLabStatus({
        instanceUrl,
        startDate,
        endDate,
        isStudent,
      }),
    [endDate, instanceUrl, isStudent, startDate]
  );

  const handleShowStep = useCallback(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.open();
    }
  }, []);

  const handleAttemptLab = useOnAttemptLab({
    isStudent,
    classLabId,
    instanceUrl,
  });

  const handleFinishLab = useOnFinishLab({
    isStudent,
    classLabId,
  });

  const onEditClassLab: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      handleEditClassLab && handleEditClassLab(classLab);
    },
    [classLab, handleEditClassLab]
  );

  const onDeleteClassLab: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      handleDeleteClassLab && handleDeleteClassLab(classLab.id);
    },
    [classLab.id, handleDeleteClassLab]
  );

  return (
    <LabCardProvider value={classLab}>
      <LabCardView
        isStudent={isStudent}
        classLab={classLab}
        status={labStatus}
        handleShowStep={handleShowStep}
        onAttempt={handleAttemptLab}
        isAttemptingLab={isAttemptingLab}
        onFinish={handleFinishLab}
        onEditClassLab={onEditClassLab}
        onDeleteClassLab={onDeleteClassLab}
      />
      <LabStepsModal classLab={classLab} modalRef={modalRef} />
    </LabCardProvider>
  );
};

export default React.memo(LabCardContainer);
