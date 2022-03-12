import {ColDef} from 'ag-grid-community';
import {UserRole} from 'shared/models';
import {DETAIL_COLUMN_DEF} from '../LecturersGrid.constants';
import {classesColumnValueGetter} from '../LecturersGrid.utils/classesColumnValueGetter';

export const useLecturersGridColDefs = (userRole: UserRole): ColDef[] => ([
	{
		field: 'name',
		headerName: 'Name',
		checkboxSelection: true
	},
	{
		field: 'email',
		headerName: 'Email'
	},
	{
		field: 'classes',
		headerName: 'Classes',
		valueGetter: classesColumnValueGetter,
	},
	{
		field: 'createdDate',
		headerName: 'Created Date'
	},
	DETAIL_COLUMN_DEF
])
