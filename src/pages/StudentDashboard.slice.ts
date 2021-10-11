import {createEntityAdapter, createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {AppContext, ResponseStatus} from 'shared/constants';
import {Lab} from 'shared/models';
import {LabsState, LabsUIState} from './StudentDashboard.types';
import {createLabInstance, fetchStudentLabs} from './StudentDashboard.thunks';

export const labsAdapter = createEntityAdapter<Lab>({
	selectId: lab => lab.labId,
});
const initialState = labsAdapter.getInitialState()

export const labsSlice = createSlice<LabsState, SliceCaseReducers<LabsState>>({
	name: AppContext.Lab,
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchStudentLabs.fulfilled, (state, {payload}) => {
			const {data} = payload;
			labsAdapter.upsertMany(state, data);
		});
		builder.addCase(createLabInstance.fulfilled, (state, {payload}) => {
			const {url, labId} = payload;
			window.open(url, '_blank');
			labsAdapter.updateOne(state, {
				id: labId,
				changes: {
					url
				}
			})
		});
	}
});

const initialLabsUIState: LabsUIState = {
	createInstanceStatus: null,
	selectedLab: null
}

export const labsUISlice = createSlice<LabsUIState, SliceCaseReducers<LabsUIState>>({
	name: AppContext.User,
	initialState: initialLabsUIState,
	reducers: {
		setSelectedLab: (state, {payload}) => ({
			...state,
			selectedLab: payload
		})
	},
	extraReducers: builder => {
		builder
			.addCase(createLabInstance.pending, (state, {payload}) => {
				return {
					...state,
					createInstanceStatus: null
				}
			})
			.addCase(createLabInstance.fulfilled, (state, {payload}) => {
				return {
					...state,
					createInstanceStatus: ResponseStatus.Success
				}
			})
			.addCase(createLabInstance.rejected, (state, {payload}) => {
				return {
					...state,
					createInstanceStatus: ResponseStatus.Failed
				}
			})
	}
});

export const {setSelectedLab} = labsUISlice.actions;
export const labsReducer = labsSlice.reducer;
export const labsUIReducer = labsUISlice.reducer;
