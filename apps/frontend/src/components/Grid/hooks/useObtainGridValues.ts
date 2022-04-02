import {GridReadyEvent} from 'ag-grid-community';
import {useCallback, useState} from 'react';
import {GridContextValues, initialGridContextValues} from '../GridContext';

export type UseObtainGridValuesReturnValues = [
  GridContextValues,
  (params: GridReadyEvent) => void
];

export const useObtainGridValues = (): UseObtainGridValuesReturnValues => {
  const [gridValues, setGridValues] = useState<GridContextValues>(
    initialGridContextValues
  );

  const obtainGridValues = useCallback(
    (params: GridReadyEvent) =>
      setGridValues({
        gridApi: params.api,
        columnApi: params.columnApi,
      }),
    [setGridValues]
  );

  return [gridValues, obtainGridValues];
};
