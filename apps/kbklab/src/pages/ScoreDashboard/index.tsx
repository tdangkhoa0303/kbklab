import {GridContextProvider, useObtainGridValues} from 'components';
import Stack from '@mui/material/Stack';
import {PageTitle} from 'components';
import React, {useMemo} from 'react';
import {Outlet} from 'react-router-dom'
import ClassSelect from './components/ClassSelect';
import ExportToCSVButton from './components/ExportToCSVButton';
import {useScoreDashboardRouteParams} from './hooks';

const ScoreDashboard: React.FC = () => {
	const [gridValues, obtainGridValues] = useObtainGridValues();
	const {classCode} = useScoreDashboardRouteParams();

	const outletContextValues = useMemo(() => ({
		obtainGridValues,
		classCode,
	}), [classCode, obtainGridValues])

	return (
		<Stack
			spacing={2}
			sx={{width: '100%'}}
		>
			<PageTitle mb={0} title="Score Dashboard" />
			<GridContextProvider value={gridValues}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<ClassSelect classCode={classCode} />
					<ExportToCSVButton classCode={classCode} />
				</Stack>
				<Outlet context={outletContextValues} />
			</GridContextProvider>
		</Stack>
	)
}

export default React.memo(ScoreDashboard);
