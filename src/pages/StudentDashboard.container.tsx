import Box from '@mui/material/Box';
import LabCard from './studentDashboard/LabCard.container';
import React, {useCallback, useMemo} from 'react';
import Grid from '@mui/material/Grid';
import {useMounting} from '../shared/hooks';
import {
	useCreateLabInstanceStatus,
	useFetchStudentLabs,
	useIsCreatingLabInstance,
	useSelectedLab,
	useSetSelectedLab,
	useStudentLabs
} from './StudentDashboard.hooks';
import partition from 'lodash/partition';
import {getLabStatus} from './studentDashboard/LabCard.utils';
import {LabStatus} from '../shared/constants';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useToggle} from '../shared/hooks/useToggle';
import LabSteps from './studentDashboard/LabSteps';
import isEmpty from 'lodash/isEmpty';
import {useLoadingToast} from '../shared/hooks/useLoadingToast';

const StudentDashboard: React.FC = () => {
	const fetchStudentLabs = useFetchStudentLabs();
	const studentLabByIds = useStudentLabs();
	const [inProgressLabs, otherLabs] = useMemo(() => (
		partition(Object.values(studentLabByIds), lab => getLabStatus(!!lab.stepSuccess, lab.url) === LabStatus.InProgress)
	), [studentLabByIds]);
	const setSelectedLab = useSetSelectedLab();
	const selectedLab = useSelectedLab();
	const [isOpenModal, /* omit toggle */, openModal, closeModal] = useToggle(false);
	const isCreatingLabInstance = useIsCreatingLabInstance();
	const creatingLabInstanceStatus = useCreateLabInstanceStatus();
	const showToast = useLoadingToast({
		loading: isCreatingLabInstance,
		loadingMessage: 'Creating lab instance.',
		successMessage: 'Creating lab instance successfully',
		errorMessage: 'Failed to create lab instance',
		status: creatingLabInstanceStatus
	})
	
	const showLabSteps = useCallback((labId: string) => {
		setSelectedLab(labId);
		openModal();
	}, [openModal, setSelectedLab]);

	useMounting(() => {
		fetchStudentLabs();
	});

	return (
		<Box>
			{!isEmpty(inProgressLabs) && (
				<>
					<Typography variant="h5" mb={3}>
						In Progress Lab
					</Typography>
					<Grid container spacing={4} mb={5}>
						{inProgressLabs.map((lab) => (
							<Grid item xs={4} md={4} lg={3} key={lab.labId}>
								<LabCard lab={lab} showLabSteps={showLabSteps} onCreatingInstance={showToast} />
							</Grid>
						))}
					</Grid>
				</>
			)}
			{!isEmpty(otherLabs) && (
				<>
					<Typography variant="h5" mb={3}>
						Others Lab
					</Typography>
					<Grid container spacing={4}>
						{otherLabs.map((lab) => (
							<Grid item xs={4} md={4} lg={3} key={lab.labId}>
								<LabCard lab={lab} showLabSteps={showLabSteps} onCreatingInstance={showToast} />
							</Grid>
						))}
					</Grid>
				</>
			)}
			{selectedLab && (
				<Modal
					open={isOpenModal}
					onClose={closeModal}
					sx={{outline: 'none'}}
				>
					<Box sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 800,
						bgcolor: 'background.paper',
						outline: 'none',
						boxShadow: 24,
						p: 4,
					}}>
						<LabSteps steps={selectedLab.steps} stepSuccess={selectedLab.stepSuccess}/>
					</Box>
				</Modal>
			)}
		</Box>
	)
}

export default StudentDashboard;