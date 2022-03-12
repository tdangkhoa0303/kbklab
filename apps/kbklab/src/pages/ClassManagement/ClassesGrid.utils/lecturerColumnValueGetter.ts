import {ValueGetterParams} from 'ag-grid-community';
import {Lecturer} from 'shared/models';

export const lecturerColumnValueGetter = (params: ValueGetterParams): string => {
	const lecturer: Lecturer = params.data.lecturer;
	return lecturer.name;
}
