import {GridReadyEvent} from 'ag-grid-community';

export interface ScoreDashboardRouteParams extends Record<string, string> {
  classCode: string;
}

export interface ScoreDashboardOutletContextValues {
  classCode: string;
  obtainGridValues: (params: GridReadyEvent) => void;
}
