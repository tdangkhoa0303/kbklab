import Box from '@mui/material/Box';
import { AgGridReactProps } from 'ag-grid-react';
import {
  Grid,
  GridContextProvider,
  sizeColumnsToFit,
  useObtainGridValues,
} from 'components';
import { FormikConfig, FormikValues } from 'formik';
import React, { PropsWithChildren, ReactNode } from 'react';
import { PageTitle } from '../PageTitle';
import ImportDataButton, { ImportDataButtonProps } from './ImportDataButton';

export interface DataManagementGridProps<
  TData,
  TFormValues extends FormikValues
> extends AgGridReactProps,
    ImportDataButtonProps<TFormValues> {
  title?: string;
  rowData: TData[];
  sampleFileUrl: string;
  isImportingData: boolean;
  importButtonText?: string;
  toolPanelContent?: ReactNode;
  gridActions?: ReactNode;
  onSubmitImportForm: (formData: FormData) => void;
  FormikProps?: Partial<FormikConfig<TFormValues>>;
}

export type DataManagementGridPropsWithChildren<
  TData,
  TFormValues extends FormikValues
> = PropsWithChildren<DataManagementGridProps<TData, TFormValues>>;

const DataManagementGrid = <TData, TFormValues extends FormikValues>(
  props: DataManagementGridPropsWithChildren<TData, TFormValues>
): React.ReactElement<
  DataManagementGridPropsWithChildren<TData, TFormValues>
> => {
  const {
    title,
    rowData,
    children,
    FormikProps,
    gridActions,
    initialValues,
    sampleFileUrl,
    isImportingData,
    importButtonText,
    importDataStatus,
    toolPanelContent,
    onSubmitImportForm,
    ...gridProps
  } = props;
  const [gridValues, obtainGridValues] = useObtainGridValues();

  return (
    <Box
      display="flex"
      flexGrow={2}
      flexDirection="column"
      sx={{ height: '100%' }}
    >
      <Box display="flex">
        {title && <PageTitle title={title} />}
        <Box flexGrow={2} />
        <Box display="flex" justifyContent="flex-end" mb={1}>
          {gridActions}
          <ImportDataButton<TFormValues>
            initialValues={initialValues}
            sampleFileUrl={sampleFileUrl}
            isImportingData={isImportingData}
            importDataStatus={importDataStatus}
            importButtonText={importButtonText}
            onSubmitImportForm={onSubmitImportForm}
            FormikProps={FormikProps}
          >
            {children}
          </ImportDataButton>
        </Box>
      </Box>
      <GridContextProvider value={gridValues}>
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          <Grid
            suppressRowClickSelection
            rowData={rowData}
            onGridReady={obtainGridValues}
            onPaginationChanged={sizeColumnsToFit}
            {...gridProps}
          />
          {toolPanelContent}
        </Box>
      </GridContextProvider>
    </Box>
  );
};

export default React.memo(
  DataManagementGrid
) as unknown as typeof DataManagementGrid;
