import {ModalRef} from 'components';
import isNull from 'lodash/isNull';
import {useGetAllClasses} from 'pages/ClassManagement/ClassesGrid.hooks';
import {useGetAllLecturers} from 'pages/LecturerManagement/LecturersGrid.hooks';
import React, {useCallback, useEffect, useRef} from 'react';
import {useMounting, useUser} from 'shared/hooks';
import {UserRole} from 'shared/models'
import {useCreateOrUpdateClassLabOptions} from './createClassLabButton';
import {
	useCreateClassLab,
	useCreateClassLabStatus,
	useGetAllLabs,
	useIsCreatingClassLab,
} from './CreateClassLabButton.hooks';
import CreateClassLabButtonView from './CreateClassLabButton.view';
import CreateLabModal from './createClassLabButton/CreateOrUpdateClassLabModal';

const CreateClassLabButtonContainer: React.FC = () => {
	const createLabModalRef = useRef<ModalRef>(null);
	const createClassLab = useCreateClassLab();
	const isCreatingClassLab = useIsCreatingClassLab();
	const createClassLabStatus = useCreateClassLabStatus();
	const getAllLabs = useGetAllLabs();
	const getAllClasses = useGetAllClasses();
	const getAllLecturers = useGetAllLecturers();
	const userInfo = useUser();

	useMounting(() => {
		getAllLabs();
		getAllClasses();
		if(userInfo.role > UserRole.Lecturer) {
			getAllLecturers();
		}
	});

	const {classOptions, labOptions} = useCreateOrUpdateClassLabOptions();

	const handleClickButton = useCallback(() => {
		if (createLabModalRef.current) {
			createLabModalRef.current.open();
		}
	}, []);

	useEffect(() => {
		if (!isNull(createClassLabStatus) && createLabModalRef.current) {
			createLabModalRef.current.close();
		}
	}, [createClassLabStatus]);

	return (
		<>
			<CreateClassLabButtonView handleClickButton={handleClickButton} />
			<CreateLabModal
				labOptions={labOptions}
				onSubmit={createClassLab}
				classOptions={classOptions}
				modalRef={createLabModalRef}
				isLoading={isCreatingClassLab}
			/>
		</>
	);
};

export default React.memo(CreateClassLabButtonContainer);
