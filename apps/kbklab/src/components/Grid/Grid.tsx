import Box, {BoxProps} from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {AgGridReact, AgGridReactProps} from 'ag-grid-react';
import React from 'react';

export type GridProps = BoxProps & AgGridReactProps

const Grid: React.FC<GridProps> = (props) => {
	const theme = useTheme();

	return (
		<Box
		     reactUi
		     animateRows
		     color={theme.palette.primary.main}
		     rowSelection="multiple"
		     component={AgGridReact}
		     className="ag-theme-material"
		     sx={{
			     height: 'unset !important',
			     borderRadius: theme => theme.spacing(1),
			     overflow: 'hidden',
			     flexGrow: 1,

			     '& *': {
					 fontFamily: 'Public Sans, sans-serif'
			     }
		     }}
		     {...props}
		/>
	)
}

export default React.memo(Grid);
