import {createSelector} from '@reduxjs/toolkit';
import {entitiesStateSelector, uiStateSelector} from 'shared/redux/rootSelector';
import {EntitiesState, UIState} from 'shared/redux/rootReducers';
import {Lab} from 'shared/models';

export const studentLabsSelector = createSelector(
	entitiesStateSelector,
	(state: EntitiesState) => Object.values(state.labs.entities) as Lab[]
)

export const createLabInstanceStatusSelector = createSelector(
	uiStateSelector,
	(state: UIState) => state.labs.createInstanceStatus
)
