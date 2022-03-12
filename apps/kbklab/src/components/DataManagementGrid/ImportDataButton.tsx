import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {ModalRef} from 'components';
import {FormikConfig, FormikValues} from 'formik';
import isNil from 'lodash/isNil';
import React, {PropsWithChildren, useCallback, useEffect, useRef} from 'react';
import {ResponseStatus} from 'shared/constants';
import {useLoadingToast} from 'shared/hooks';
import {ImportDataFormValuesWithFile} from './ImportDataButton.types';
import ImportDataModal from './importDataButton/ImportDataModal';

export interface ImportDataButtonProps<TImportFormValues extends FormikValues> {
	sampleFileUrl: string;
	isImportingData: boolean;
	importButtonText?: string;
	initialValues: TImportFormValues;
	importDataStatus: ResponseStatus | null;
	onSubmitImportForm: (formData: FormData) => void;
	FormikProps?: Partial<FormikConfig<TImportFormValues>>;
}

export type ImportDataButtonPropsWithChildren<
	TImportFormValues extends FormikValues
> = PropsWithChildren<ImportDataButtonProps<TImportFormValues>>;

const ImportDataButton = <TImportFormValues extends FormikValues>(
	props: ImportDataButtonPropsWithChildren<TImportFormValues>
): React.ReactElement<ImportDataButtonPropsWithChildren<TImportFormValues>> => {
	const {
		children,
		FormikProps,
		sampleFileUrl,
		initialValues,
		isImportingData,
		importButtonText = 'Import Data',
		importDataStatus,
		onSubmitImportForm,
	} = props;

	const modalRef = useRef<ModalRef>(null);

	const {showToast} = useLoadingToast({
		loading: isImportingData,
		loadingMessage: 'Importing lecturers...',
		successMessage: 'Imported lecturers successfully',
		errorMessage: 'Failed to Import lecturers',
		status: importDataStatus,
	});

	const onSubmit = useCallback(
		(importingData: ImportDataFormValuesWithFile<TImportFormValues>) => {
			const {files, ...remainingFields} = importingData;
			if (isNil(files) || !files.length) {
				return;
			}

			const formData = new FormData();
			formData.append('file', files[0]);

			Object.entries(remainingFields).forEach(([fieldName, fieldValue]) =>
				formData.append(fieldName, fieldValue)
			);

			onSubmitImportForm(formData);
			showToast();
		},
		[onSubmitImportForm, showToast]
	);

	useEffect(() => {
		if (isImportingData || !modalRef.current) {
			return;
		}

		importDataStatus && modalRef.current.close();

		// Just want to listen on importDataStatus
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [importDataStatus]);

	const handleImportButtonClick = useCallback(
		() => modalRef.current && modalRef.current.open(),
		[modalRef]
	);

	return (
		<Box ml={1}>
			<Button
				variant="contained"
				onClick={handleImportButtonClick}
				startIcon={<AddIcon />}
			>
				{importButtonText}
			</Button>
			<ImportDataModal<TImportFormValues>
				onSubmit={onSubmit}
				modalRef={modalRef}
				initialValues={initialValues}
				sampleFileUrl={sampleFileUrl}
				FormikProps={FormikProps}
			>
				{children}
			</ImportDataModal>
		</Box>
	);
};

export default React.memo(
	ImportDataButton
) as unknown as typeof ImportDataButton;
