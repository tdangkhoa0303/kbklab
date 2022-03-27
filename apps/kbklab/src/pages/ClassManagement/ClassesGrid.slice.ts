import {createEntityAdapter, createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import Immutable from 'seamless-immutable';
import {AppContext, ResponseStatus} from 'shared/constants';
import {Class} from 'shared/models';
import {createClassLab} from '../../components/CreateClassLabButton/CreateClassLabButton.thunks';
import {deleteClassLab, getAllClasses, importClasses, updateClassLab} from './ClassesGrid.thunks';
import {ClassesGridState, ClassesUIState} from './ClassesGrid.types';

export const classesAdapter = createEntityAdapter<Class>({
	selectId: (currentLClass) => currentLClass.id,
});
const initialState = classesAdapter.getInitialState();

export const classesSlice = createSlice<ClassesGridState, SliceCaseReducers<ClassesGridState>>({
	name: AppContext.Class,
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllClasses.fulfilled, (state, {payload}) => {
				const {data} = payload;
				classesAdapter.upsertMany(state, data);
			})
			.addCase(importClasses.fulfilled, (state, {payload}) => {
				const {data} = payload;
				classesAdapter.upsertOne(state, data.class);
			})
			.addCase(createClassLab.fulfilled, (state, {payload}) => {
				const {data} = payload;
				const classId = data.class
				const currentClass = state.entities[classId]

				if(currentClass) {
					classesAdapter.updateOne(state, {
						id: classId,
						changes: {
							classLabs: {
								...currentClass.classLabs,
								[data.id]: data,
							}
						},
					});
				}
			})
			.addCase(updateClassLab.fulfilled, (state, {payload}) => {
				const {class: classId} = payload;
				const currentClass = state.entities[classId]
				if(!currentClass) {
					return;
				}

				classesAdapter.updateOne(state, {
					id: classId,
					changes: {
						classLabs: {
							...currentClass.classLabs,
							[payload.id]: payload
						}
					},
				});
			})
			.addCase(deleteClassLab.fulfilled, (state, {payload}) => {
				const {classId, classLabId} = payload;
				const currentClass = state.entities[classId];
				if(!currentClass) {
					return;
				}

				classesAdapter.updateOne(state, {
					id: classId,
					changes: {
						classLabs: Immutable(currentClass.classLabs).without(classLabId).asMutable({deep: true})
					}
				});
			});
	},
});

const initialImportClassesUIState: ClassesUIState = {
	importClassesStatus: null,
	currentDetailClassId: null,
	updateClassLabStatus: null,
	deleteClassLabStatus: null,
};

export const classesUISlice = createSlice<ClassesUIState, SliceCaseReducers<ClassesUIState>>({
	name: AppContext.Class,
	initialState: initialImportClassesUIState,
	reducers: {
		setCurrentDetailClassId(state, action: PayloadAction<string>) {
			return {
				...state,
				currentDetailClassId: action.payload
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(importClasses.pending, (state, {payload}) => {
				return {
					...state,
					importClassesStatus: null,
				};
			})
			.addCase(importClasses.fulfilled, (state, {payload}) => {
				return {
					...state,
					importClassesStatus: ResponseStatus.Success,
				};
			})
			.addCase(importClasses.rejected, (state, {payload}) => {
				return {
					...state,
					importClassesStatus: ResponseStatus.Failed,
				};
			})
			.addCase(updateClassLab.pending, (state, {payload}) => {
				return {
					...state,
					updateClassLabStatus: null,
				};
			})
			.addCase(updateClassLab.fulfilled, (state, {payload}) => {
				return {
					...state,
					updateClassLabStatus: ResponseStatus.Success,
				};
			})
			.addCase(updateClassLab.rejected, (state, {payload}) => {
				return {
					...state,
					updateClassLabStatus: ResponseStatus.Failed,
				};
			})
			.addCase(deleteClassLab.pending, (state, {payload}) => {
				return {
					...state,
					deleteClassLabStatus: null,
				};
			})
			.addCase(deleteClassLab.fulfilled, (state, {payload}) => {
				return {
					...state,
					deleteClassLabStatus: ResponseStatus.Success,
				};
			})
			.addCase(deleteClassLab.rejected, (state, {payload}) => {
				return {
					...state,
					deleteClassLabStatus: ResponseStatus.Failed,
				};
			});
	},
});

export const {setCurrentDetailClassId} = classesUISlice.actions

export const classesUIReducer = classesUISlice.reducer;
export const classesReducer = classesSlice.reducer;
