import {GridReadyEvent} from 'ag-grid-community';
import {MutableRefObject, useCallback, useRef, useState} from 'react';
import {GridContextValues, initialGridContextValues} from '../GridContext';

export type UseObtainGridValuesReturnValues = [
  GridContextValues,
  (params: GridReadyEvent) => void
];

export const useObtainGridValues = (externalGridRef?: MutableRefObject<GridContextValues | null>): UseObtainGridValuesReturnValues => {
  const [gridValues, setGridValues] = useState(initialGridContextValues);

  const obtainGridValues = useCallback(
    (params: GridReadyEvent) => {
      const gridValues = ({
        gridApi: params.api,
        columnApi: params.columnApi,
      })
      setGridValues(gridValues);

      if(externalGridRef) {
        externalGridRef.current = gridValues
      }
    }, [externalGridRef]
  );

  return [gridValues, obtainGridValues];
};
