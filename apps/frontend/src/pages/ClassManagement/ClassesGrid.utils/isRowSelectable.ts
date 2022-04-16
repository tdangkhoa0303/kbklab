import {IsRowSelectable} from 'ag-grid-community/dist/lib/entities/gridOptions';
import isEmpty from 'lodash/isEmpty';

export const isRowSelectable: IsRowSelectable = (rowNode) => isEmpty(rowNode.data.classLabs);
