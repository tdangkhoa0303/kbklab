import {createSelector} from '@reduxjs/toolkit';
import {entitiesStateSelector, uiStateSelector} from 'shared/redux/rootSelector';
import {EntitiesState, UIState} from 'shared/redux/rootReducers';

export const studentLabByIdsSelector = createSelector(
	entitiesStateSelector,
	(state: EntitiesState) => state.labs.entities
)

export const createLabInstanceStatusSelector = createSelector(
	uiStateSelector,
	(state: UIState) => state.labs.createInstanceStatus
)

export const finishLabAttemptStatusSelector = createSelector(
	uiStateSelector,
	(state: UIState) => state.labs.finishLabAttemptStatus
)
