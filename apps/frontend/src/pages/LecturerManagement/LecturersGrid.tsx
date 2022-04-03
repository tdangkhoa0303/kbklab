import {DataManagementGrid} from 'components';
import React from 'react';
import {Lecturer, UserRole} from 'shared/models';
import {frameworkComponents, LECTURERS_IMPORT_SAMPLE_URL,} from './LecturersGrid.constants';
import {
  useAllLecturers,
  useImportLecturers,
  useImportLecturersStatus,
  useIsImportingLecturers,
  useLecturersGridColDefs,
} from './LecturersGrid.hooks';
import {ImportLecturerFormValues} from './LecturersGrid.types';

const LecturersGrid: React.FC = () => {
  const importLecturers = useImportLecturers();
  const isImportingLecturers = useIsImportingLecturers();
  const allLecturers = useAllLecturers();
  const importLecturersStatus = useImportLecturersStatus();
  const lecturersGridColDefs = useLecturersGridColDefs(UserRole.Lecturer);

  return (
    <DataManagementGrid<Lecturer, ImportLecturerFormValues>
      initialValues={{}}
      rowData={allLecturers}
      title="Lecturer Management"
      columnDefs={lecturersGridColDefs}
      onSubmitImportForm={importLecturers}
      isImportingData={isImportingLecturers}
      importDataStatus={importLecturersStatus}
      frameworkComponents={frameworkComponents}
      sampleFileUrl={LECTURERS_IMPORT_SAMPLE_URL}
    />
  );
};

export default React.memo(LecturersGrid);
