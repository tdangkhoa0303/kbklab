import {PaginationChangedEvent} from 'ag-grid-community';
import {useCallback} from 'react';

export type PaginationChangedHandler = (params: PaginationChangedEvent) => void;
export const useSizeColumnsToFit = (): PaginationChangedHandler =>
  useCallback((params) => {
    const { api: gridApi } = params;
    gridApi.sizeColumnsToFit();
  }, []);
