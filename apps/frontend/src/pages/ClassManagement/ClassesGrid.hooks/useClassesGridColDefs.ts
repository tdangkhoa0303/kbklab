import { ColDef } from 'ag-grid-community';
import { DETAIL_COLUMN_DEF } from '../ClassesGrid.constants';
import {
  lecturerColumnValueGetter,
  studentsColumnValueFormatter,
} from '../ClassesGrid.utils';

export const useClassesGridColDefs = (): ColDef[] => [
  {
    field: 'code',
    headerName: 'Class Code',
    checkboxSelection: true,
    minWidth: 40,
  },
  {
    field: 'lecturer',
    headerName: 'Lecturer',
    valueGetter: lecturerColumnValueGetter,
  },
  {
    field: 'students',
    headerName: 'Students',
    valueFormatter: studentsColumnValueFormatter,
  },
  DETAIL_COLUMN_DEF,
];
