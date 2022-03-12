import {createSelector, EntityState} from '@reduxjs/toolkit';
import {ResponseStatus} from 'shared/constants';
import {Class} from 'shared/models'
import {EntitiesState, RootState, UIState} from 'shared/redux/rootReducers';
import {entitiesStateSelector, uiStateSelector} from 'shared/redux/rootSelector';
import {classesAdapter} from './ClassesGrid.slice';
import {ClassesUIState} from './ClassesGrid.types';

export const classesEntitiesSelector = createSelector(
	entitiesStateSelector,
	(entitiesState: EntitiesState): EntityState<Class> => entitiesState.classes
);

export const classesUIStateSelector = createSelector(
	uiStateSelector,
	(uiState: UIState): ClassesUIState => uiState.classes
)

export const importClassesStatusSelector = createSelector(
	classesUIStateSelector,
	(uiState: ClassesUIState): ResponseStatus | null => uiState.importClassesStatus
);

export const currentDetailClassIdSelector = createSelector(
	classesUIStateSelector,
	(uiState: ClassesUIState): string | null =>  uiState.currentDetailClassId
);

export const currentDetailClassSelector = createSelector(
	classesEntitiesSelector,
	currentDetailClassIdSelector,
	({entities}, currentDetailClassId): Class | undefined => currentDetailClassId ? entities[currentDetailClassId] : undefined
);

export const updateClassLabStatusSelector = createSelector(
	classesUIStateSelector,
	(uiState: ClassesUIState): ResponseStatus | null => uiState.updateClassLabStatus
);

export const deleteClassLabStatusSelector = createSelector(
	classesUIStateSelector,
	(uiState: ClassesUIState): ResponseStatus | null => uiState.deleteClassLabStatus
);

export const {selectAll: allClassesSelector, selectById: classByIdSelector} = classesAdapter.getSelectors(classesEntitiesSelector);

export const classByCodeSelector = createSelector(
	(rootState: RootState, code: string): string => code,
	allClassesSelector,
	(code, allClasses): Class | null => allClasses.find(currentClass => currentClass.code === code) || null
)
