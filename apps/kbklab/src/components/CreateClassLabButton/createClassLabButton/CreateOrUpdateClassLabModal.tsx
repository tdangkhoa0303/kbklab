import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import {Theme} from '@mui/material/styles';
import {FormikDateTimePicker, FormikModal, FormikTextField, ModalRef} from 'components';
import moment from 'moment';
import React, {RefObject, useCallback, useMemo} from 'react';
import {Option} from 'shared/constants';
import {ClassLab} from 'shared/models';
import {CreateClassLabValues} from '../CreateClassLabButton.types';
import {createClassLabSchema} from './CreateOrUpdateClassLabModal.constants';
import {useCreateClassLabInitialValues} from './CreateOrUpdateClassLabModal.hooks';

export type DisabledFields = Partial<Record<keyof CreateClassLabValues, boolean>>

export interface CreateOrUpdateClassLabModalProps {
	labOptions: Option[];
	classOptions: Option[];
	modalRef: RefObject<ModalRef>;
	onSubmit: (values: CreateClassLabValues) => void;
	isLoading: boolean;
	editingClassLab?: ClassLab;
	disabledFields?: DisabledFields;
}

const selectProps = {
  MenuProps: {
    sx: {
      maxHeight: (theme: Theme) => theme.spacing(35)
    }
  }
}

const CreateOrUpdateClassLabModal: React.FC<CreateOrUpdateClassLabModalProps> = (props) => {
	const {classOptions, labOptions, modalRef, onSubmit, isLoading, editingClassLab, disabledFields = {}} = props;

	const initialValues = useCreateClassLabInitialValues(editingClassLab);
	const {startDate, endDate} = initialValues;

	const minStartDate = useMemo(() => moment(startDate), [startDate]);
	const minEndDate = useMemo(() => moment(endDate), [endDate]);

	const handleSubmitForm = useCallback(({startDate, endDate, ...values}: CreateClassLabValues) => {
		onSubmit({
			...values,
			startDate: moment(startDate).utc().toISOString(),
			endDate: moment(endDate).utc().toISOString(),
		})
	}, [onSubmit])

	return (
		<FormikModal<CreateClassLabValues>
			title="Open class lab"
			modalRef={modalRef}
			onSubmit={handleSubmitForm}
			isLoading={isLoading}
			validationSchema={createClassLabSchema}
			initialValues={initialValues}
		>
			<FormikTextField
				hidden
				name="id"
				sx={{display: 'none'}}
			/>
			<Stack spacing={3}>
				<FormikTextField
					select
					fullWidth
					label="Class"
					name="classId"
					placeholder="Select class"
          SelectProps={selectProps}
					disabled={disabledFields.classId}
				>
					{classOptions.map(({value, label}) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</FormikTextField>
				<FormikTextField
					select
					fullWidth
					label="Lab"
					name="labId"
					placeholder="Select lab"
          SelectProps={selectProps}
					disabled={disabledFields.labId}
				>
					{labOptions.map(({value, label}) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</FormikTextField>
				<Stack direction="row" spacing={3}>
					<FormikDateTimePicker
						name="startDate"
						label="Start time"
						minDateTime={minStartDate}
						disabled={disabledFields.startDate}
					/>
					<FormikDateTimePicker
						name="endDate"
						label="End time"
						minDateTime={minEndDate}
						disabled={disabledFields.endDate}
					/>
				</Stack>
			</Stack>
		</FormikModal>
	);
};

export default React.memo(CreateOrUpdateClassLabModal);


