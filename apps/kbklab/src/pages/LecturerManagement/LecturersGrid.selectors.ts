import {createSelector} from '@reduxjs/toolkit';
import {EntitiesState, UIState} from 'shared/redux/rootReducers';
import {entitiesStateSelector, uiStateSelector} from 'shared/redux/rootSelector';
import {lecturersAdapter} from './LecturesGrid.slice';

export const lecturerEntitiesSelector = createSelector(
	entitiesStateSelector,
	(entitiesState: EntitiesState) => entitiesState.lecturers
);

export const importLecturersStatusSelector = createSelector(
	uiStateSelector,
	(uiState: UIState) => uiState.lecturers.importLecturersStatus
);

export const {selectAll: allLecturersSelector} = lecturersAdapter.getSelectors(lecturerEntitiesSelector);
