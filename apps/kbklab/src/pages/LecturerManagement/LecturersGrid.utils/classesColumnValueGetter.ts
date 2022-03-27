import {ValueGetterParams} from 'ag-grid-community';
import {Lecturer} from 'shared/models';

export const classesColumnValueGetter = (params: ValueGetterParams): string => {
	const {classes} = params.data as Lecturer;
	return classes.join(', ');
}
