import {ResponseStatus} from 'shared/constants';
import {useLoadingToast} from 'shared/hooks';
import {Dictionary} from '@reduxjs/toolkit';
import {CreateClassLabValues, DisabledFields} from 'components';
import reduce from 'lodash/reduce';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {updateClassLabStatusSelector} from '../ClassesGrid.selectors';
import {useUpdateClassLab} from './useUpdateClassLab';

const omitDisabledFieldsFromPayload = (values: CreateClassLabValues, disabledFields: Dictionary<boolean>): Partial<CreateClassLabValues> => (
	reduce(values, (result: Partial<CreateClassLabValues>, value, key) => {
		if(!disabledFields[key]) {
			return {
				...result,
				[key]: value
			}
		}
		return result;
	}, {})
);

export const useUpdateClassLabStatus = (): ResponseStatus | null => useSelector(updateClassLabStatusSelector);

export type UpdateClassLabHandler = (values: CreateClassLabValues) => void;

export interface UseUpdateClassLabHandlerParams {
	isUpdatingClassLab: boolean;
	disabledFields: DisabledFields;
	updateClassLabStatus: ResponseStatus | null;
}

export const useUpdateClassLabHandler = (params: UseUpdateClassLabHandlerParams): UpdateClassLabHandler => {
	const {isUpdatingClassLab, disabledFields, updateClassLabStatus} = params;
	const updateClassLab = useUpdateClassLab();
	const {showToast} = useLoadingToast({
		loading: isUpdatingClassLab,
		status: updateClassLabStatus,
		successMessage: 'Successfully updated class lab',
		errorMessage: 'Failed updating class lab',
		loadingMessage: 'Updating class lab'
	})

	return useCallback((values: CreateClassLabValues) => {
		const valuesToSubmit = omitDisabledFieldsFromPayload(values, disabledFields)
		showToast();
		updateClassLab(valuesToSubmit)
	}, [disabledFields, showToast, updateClassLab]);
}
