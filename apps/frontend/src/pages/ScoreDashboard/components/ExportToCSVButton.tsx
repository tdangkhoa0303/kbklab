import Button from '@mui/material/Button';
import {useGridContext} from 'components';
import React, {useCallback} from 'react';

export interface ExportToCSVButtonProps {
  classCode: string;
}

const ExportToCSVButton: React.FC<ExportToCSVButtonProps> = ({ classCode }) => {
  const {gridApi} = useGridContext();

  const exportToCSV = useCallback(() => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  }, [gridApi]);

  return (
    <Button variant="contained" onClick={exportToCSV}>
      Export To CSV
    </Button>
  );
};

export default ExportToCSVButton;
