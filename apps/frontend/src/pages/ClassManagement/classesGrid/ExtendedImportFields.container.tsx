import React, { useMemo } from 'react';
import { useUser } from 'shared/hooks';
import { UserRole } from 'shared/models';
import { useLecturerOptions } from '../ClassesGrid.hooks';
import ExtendedImportFieldsView from './ExtendedImportFields.view';

const ExtendedImportFields: React.FC = () => {
  const lecturerOptions = useLecturerOptions();
  const user = useUser();

  const isLecturer = useMemo(
    () => Boolean(user && user.role === UserRole.Lecturer),
    [user]
  );

  return (
    <ExtendedImportFieldsView
      lecturerOptions={lecturerOptions}
      isLecturer={isLecturer}
    />
  );
};

export default React.memo(ExtendedImportFields);
