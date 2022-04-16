import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {DataManagementGrid, GridContextValues} from 'components';
import React, {useRef} from 'react';
import {useMounting} from 'shared/hooks';
import {Class} from 'shared/models';
import ClassDetailPanel from './ClassDetailPanel.container';
import {CLASSES_IMPORT_SAMPLE_URL, frameworkComponents,} from './ClassesGrid.constants';
import {
  useAllClasses,
  useClassesGridColDefs,
  useDeleteClasses,
  useImportClasses,
  useImportClassesStatus,
  useImportClassInitialValues,
  useIsImportingClasses,
  useSetCurrentDetailClassId,
} from './ClassesGrid.hooks';
import {ImportClassesFormValues} from './ClassesGrid.types';
import {isRowSelectable, validateImportClassesValues} from './ClassesGrid.utils';
import ExtendedImportFields from './classesGrid/ExtendedImportFields.container';

const ClassesGrid: React.FC = () => {
  const importClasses = useImportClasses();
  const gridRef = useRef<GridContextValues | null>(null);
  const isImportingClasses = useIsImportingClasses();
  const allClasses = useAllClasses();
  const importClassesStatus = useImportClassesStatus();
  const classesGridColDefs = useClassesGridColDefs();
  const initialValues = useImportClassInitialValues();

  const deleteClasses = useDeleteClasses(gridRef);

  // Clean up the selected class when leaving the page
  const setCurrentDetailClassId = useSetCurrentDetailClassId();
  useMounting(() => () => setCurrentDetailClassId(null));

  return (
    <DataManagementGrid<Class, ImportClassesFormValues>
      gridRef={gridRef}
      rowData={allClasses}
      title="Class Management"
      initialValues={initialValues}
      columnDefs={classesGridColDefs}
      onSubmitImportForm={importClasses}
      isImportingData={isImportingClasses}
      importDataStatus={importClassesStatus}
      toolPanelContent={<ClassDetailPanel />}
      frameworkComponents={frameworkComponents}
      sampleFileUrl={CLASSES_IMPORT_SAMPLE_URL}
      FormikProps={{validate: validateImportClassesValues}}
      isRowSelectable={isRowSelectable}
      gridActions={(
        <Box>
          <IconButton onClick={deleteClasses}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )}
    >
      <ExtendedImportFields />
    </DataManagementGrid>
  );
};

export default React.memo(ClassesGrid);
