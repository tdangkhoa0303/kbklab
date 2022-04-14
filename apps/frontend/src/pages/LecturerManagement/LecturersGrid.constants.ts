import {LecturerDetailCellRenderer} from 'components/GridCellRenderer';

export enum FrameworkComponents {
  LecturerDetailCellRenderer = 'LecturerDetailCellRenderer',
}

export const frameworkComponents = {
  [FrameworkComponents.LecturerDetailCellRenderer]: LecturerDetailCellRenderer,
};

export const LECTURERS_IMPORT_SAMPLE_URL =
  '/public/sample/import-lecturers-sample.xlsx';
