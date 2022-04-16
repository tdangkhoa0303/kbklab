import {GridReadyEvent} from 'ag-grid-community';
import {MutableRefObject, useCallback, useRef} from 'react';
import {GridContextValues, initialGridContextValues} from '../GridContext';

export type UseObtainGridValuesReturnValues = [
  GridContextValues,
  (params: GridReadyEvent) => void
];

export const useObtainGridValues = (externalGridRef?: MutableRefObject<GridContextValues | null>): UseObtainGridValuesReturnValues => {
  const gridValuesRef = useRef<GridContextValues>(
    initialGridContextValues
  );

  const obtainGridValues = useCallback(
    (params: GridReadyEvent) => {
      const gridValues = ({
        gridApi: params.api,
        columnApi: params.columnApi,
      })

      gridValuesRef.current = gridValues;
      if(externalGridRef) {
        externalGridRef.current = gridValues
      }
    }, [externalGridRef]
  );

  return [gridValuesRef.current, obtainGridValues];
};
