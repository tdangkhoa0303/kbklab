import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {DataManagementGrid, GridContextValues} from 'components';
import React, {useRef} from 'react';
import {Lecturer, UserRole} from 'shared/models';
import {frameworkComponents, LECTURERS_IMPORT_SAMPLE_URL,} from './LecturersGrid.constants';
import {
  useAllLecturers,
  useConfirmDeleteLecturers,
  useImportLecturers,
  useImportLecturersStatus,
  useIsImportingLecturers,
  useLecturersGridColDefs,
} from './LecturersGrid.hooks';
import {ImportLecturerFormValues} from './LecturersGrid.types';

const LecturersGrid: React.FC = () => {
  const gridRef = useRef<GridContextValues | null>(null);

  const importLecturers = useImportLecturers();
  const isImportingLecturers = useIsImportingLecturers();
  const allLecturers = useAllLecturers();
  const importLecturersStatus = useImportLecturersStatus();
  const lecturersGridColDefs = useLecturersGridColDefs(UserRole.Lecturer);

  const deleteLecturers = useConfirmDeleteLecturers(gridRef)

  return (
    <DataManagementGrid<Lecturer, ImportLecturerFormValues>
      gridRef={gridRef}
      initialValues={{}}
      rowData={allLecturers}
      title="Lecturer Management"
      gridActions={(
        <Box>
          <IconButton onClick={deleteLecturers}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )}
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
