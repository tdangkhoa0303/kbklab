import {ColDef} from 'ag-grid-community';
import {defaultActionColDef} from 'shared/constants';
import ClassDetailCellRenderer from './classesGrid/ClassDetailCellRenderer';

export const CLASSES_IMPORT_SAMPLE_URL =
  '/public/sample/import-class-sample.xlsx';

export enum FrameworkComponents {
  ClassDetailCellRenderer = 'ClassDetailCellRenderer',
}

export const DETAIL_COLUMN_DEF: ColDef = {
  ...defaultActionColDef,
  cellRenderer: FrameworkComponents.ClassDetailCellRenderer,
  width: 56,
};

export const frameworkComponents = {
  [FrameworkComponents.ClassDetailCellRenderer]: ClassDetailCellRenderer,
};

export const DISPLAYED_STUDENT_NAMES = 2;

export const importClassesInitialValues = {
  classCode: '',
  lecturerId: '',
};
