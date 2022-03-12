import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {alpha, useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {Grid as DataGrid, sizeColumnsToFit} from 'components';
import {LabCard} from 'features/LabAttemption/LabCard';
import isEmpty from 'lodash/isEmpty';
import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import Immutable from 'seamless-immutable';
import {AppCommonRoute} from 'shared/constants';
import {Class, ClassLab} from 'shared/models';
import {useStudentLabEntities} from '../LabDashboard/LabsGrid.hooks';
import {maxRowsToShow, studentGridHeaderHeight, studentGridRowHeight} from './ClassDetailPanel.constants';

export interface ClassDetailPanelViewProps {
	onClose: VoidFunction;
	currentClass: Class;
	handleEditClassLab: (classLab: ClassLab) => void;
	handleDeleteClassLab: (classLabId: string) => void;
}

const ClassDetailPanelView: React.FC<ClassDetailPanelViewProps> = (props) => {
	const {onClose, currentClass, handleEditClassLab, handleDeleteClassLab} = props;
	const theme = useTheme();
	const {code, classLabs, students} = currentClass;
	const {entities: lecturersDemoLabsById} = useStudentLabEntities();

	const studentGridHeight = useMemo(() => (
		(students.length > maxRowsToShow ? maxRowsToShow : students.length) * studentGridRowHeight + studentGridHeaderHeight
	), [students]);

	const lecturerClassLabs = useMemo(() => (
		Immutable(classLabs)
			.merge(lecturersDemoLabsById)
			.asMutable({deep: true})
	), [classLabs, lecturersDemoLabsById]);

	return (
		<>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: theme.spacing(1, 2),
				background: alpha(theme.palette.primary.main, 0.2),
			}}>
				<Typography variant="h6">
					{code}
				</Typography>
				<IconButton onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</Box>
			<Stack
				spacing={2}
				sx={{
					padding: theme.spacing(1, 2),
					overflow: 'auto',
					height: '100%',
					border: `1px solid ${theme.palette.common.grey}`,
				}}
			>
				<Stack spacing={2} alignItems="start">
					<Button
						target="_blank"
						component={Link}
						variant="contained"
						to={`${AppCommonRoute.ScoreDashboard}/${code}`}
					>
						View Score
					</Button>
				</Stack>
				<Box>
					<Typography variant="subtitle1" mb={2}>
						Members
					</Typography>
					<DataGrid
						rowData={students}
						columnDefs={[
							{
								field: 'code',
								headerName: 'Code',
								checkboxSelection: true,
							},
							{
								field: 'name',
								headerName: 'Name',
							},
							{
								field: 'email',
								headerName: 'Email',
							}
						]}
						onPaginationChanged={sizeColumnsToFit}
						sx={{height: `${studentGridHeight}px !important`}}
					/>
				</Box>
				{!isEmpty(classLabs) && (
					<Box>
						<Typography variant="subtitle1" mb={2}>
							Class labs
						</Typography>
						<Grid container spacing={4}>
							{Object.values(lecturerClassLabs).map(classLab => (
								<Grid xs={12} md={6} item key={classLab.id}>
									<LabCard
										classLab={classLab}
										handleEditClassLab={handleEditClassLab}
										handleDeleteClassLab={handleDeleteClassLab}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
				)}
			</Stack>
		</>
	)
}

export default React.memo(ClassDetailPanelView);
