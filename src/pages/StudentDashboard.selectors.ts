import {createSelector} from '@reduxjs/toolkit';
import {entitiesStateSelector, uiStateSelector} from '../shared/redux/rootSelector';
import {EntitiesState, UIState} from '../shared/redux/rootReducers';
import {Lab} from 'shared/models';
import get from 'lodash/get';

export const studentLabsSelector = createSelector(
	entitiesStateSelector,
	(state: EntitiesState) => Object.values(state.labs.entities) as Lab[]
)

export const createLabInstanceStatusSelector = createSelector(
	uiStateSelector,
	(state: UIState) => state.labs.createInstanceStatus
)

export const selectedLabSelector = createSelector(
	uiStateSelector,
	entitiesStateSelector,
	(uiState: UIState, entitiesState: EntitiesState) => {
		const {selectedLab} = uiState.labs;
		const {labs: {entities: labEntities}} = entitiesState

		return selectedLab ? get(labEntities, selectedLab, null) : null
	}
)