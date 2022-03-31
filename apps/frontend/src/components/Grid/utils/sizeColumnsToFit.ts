import { PaginationChangedEvent } from 'ag-grid-community';

export const sizeColumnsToFit = (params: PaginationChangedEvent) => {
  const { api: gridApi } = params;
  gridApi.sizeColumnsToFit();
};
