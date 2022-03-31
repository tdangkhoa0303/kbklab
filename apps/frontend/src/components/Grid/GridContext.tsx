import { ColumnApi, GridApi } from 'ag-grid-community';
import React, { useContext } from 'react';

export interface GridContextValues {
  gridApi: GridApi | null;
  columnApi: ColumnApi | null;
}

export const initialGridContextValues: GridContextValues = {
  gridApi: null,
  columnApi: null,
};

const GridContext = React.createContext<GridContextValues>(
  initialGridContextValues
);

export const GridContextProvider = GridContext.Provider;

export const useGridContext = (): GridContextValues => useContext(GridContext);
