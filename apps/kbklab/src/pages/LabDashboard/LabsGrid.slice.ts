import {createEntityAdapter, createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {attemptLabThunk, finishLabThunk} from 'features/LabAttemption/thunks';
import {AppContext} from 'shared/constants';
import {ClassLab} from 'shared/models';
import {openInNewTab} from 'shared/utilities';
import {fetchStudentLabs} from './LabsGrid.thunks';
import {StudentLabsState} from './LabsGrid.types';

export const userLabsAdapter = createEntityAdapter<ClassLab>({
	selectId: (classLab) => classLab.id,
});
const initialState = userLabsAdapter.getInitialState();

export const userLabsSlice = createSlice<StudentLabsState, SliceCaseReducers<StudentLabsState>>({
	name: AppContext.StudentLab,
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStudentLabs.fulfilled, (state, {payload}) => {
				const {data} = payload;
				userLabsAdapter.upsertMany(state, data);
			})
			.addCase(attemptLabThunk.fulfilled, (state, {payload}) => {
				const {data: {url, stepSuccess}, classLabId} = payload;
				openInNewTab(url)
				userLabsAdapter.updateOne(state, {
					id: classLabId,
					changes: {
						url,
						stepSuccess,
					},
				});
			})
			.addCase(finishLabThunk.fulfilled, (state, {payload}) => {
				const {classLabId} = payload;
				userLabsAdapter.updateOne(state, {
					id: classLabId,
					changes: {
						url: undefined,
					},
				});
			});
	},
});

export const userLabsReducer = userLabsSlice.reducer;
