import React, {Ref, useImperativeHandle} from 'react';
import Box from '@mui/material/Box';
import LabSteps, {LabStepsProps} from './labStepsModal/LabSteps';
import Modal from '@mui/material/Modal';
import {useToggle} from 'shared/hooks/useToggle';
import Typography from '@mui/material/Typography';

export interface ModalRef {
	isOpen: boolean,
	openModal: VoidFunction,
	closeModal: VoidFunction
}

export interface LabStepsModalProps extends LabStepsProps {
	title: string,
	modalRef: Ref<ModalRef>
}

const LabStepsModal: React.FC<LabStepsModalProps> = (props) => {
	const {title, modalRef, ...labStepsProps} = props;
	const [isOpenModal, /* omit toggle */, openModal, closeModal] = useToggle(false);

	useImperativeHandle(modalRef, () => ({
		isOpen: isOpenModal,
		closeModal,
		openModal,
	}), [closeModal, openModal, isOpenModal])

	return (
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
				borderRadius: theme => theme.spacing(0.5),
				p: 4,
			}}>
				<Typography variant="h5" mb={2}>
					{title}
				</Typography>
				<LabSteps {...labStepsProps} />
			</Box>
		</Modal>
	)
}

const MemoizedLabStepsModal = React.memo(LabStepsModal);
export default React.forwardRef<ModalRef, Omit<LabStepsModalProps, 'modalRef'>>((props, ref) => (
	<MemoizedLabStepsModal modalRef={ref} {...props} />
))