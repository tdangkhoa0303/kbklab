import {ColDef} from 'ag-grid-community';
import {LecturerDetailCellRenderer} from 'components/GridCellRenderer';
import {defaultActionColDef} from 'shared/constants';

export enum FrameworkComponents {
  LecturerDetailCellRenderer = 'LecturerDetailCellRenderer',
}

export const frameworkComponents = {
  [FrameworkComponents.LecturerDetailCellRenderer]: LecturerDetailCellRenderer,
};

export const DETAIL_COLUMN_DEF: ColDef = {
  ...defaultActionColDef,
  cellRenderer: FrameworkComponents.LecturerDetailCellRenderer,
};

export const LECTURERS_IMPORT_SAMPLE_URL =
  '/public/sample/import-lecturers-sample.xlsx';
