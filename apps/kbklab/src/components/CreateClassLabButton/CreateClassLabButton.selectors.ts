import {createSelector} from '@reduxjs/toolkit';
import {EntitiesState, UIState} from 'shared/redux/rootReducers';
import {entitiesStateSelector, uiStateSelector} from 'shared/redux/rootSelector';
import {labsAdapter} from './CreateClassLabButton.slice';

export const labsEntitiesSelector = createSelector(
	entitiesStateSelector,
	(entitiesState: EntitiesState) => entitiesState.labs
);

export const createClassLabStatusSelector = createSelector(
	uiStateSelector,
	(uiState: UIState) => uiState.labs.createdClassLabStatus
);

export const {selectAll: allLabsSelector} = labsAdapter.getSelectors(labsEntitiesSelector);
