import {createSelector} from '@reduxjs/toolkit';
import {EntitiesState} from 'shared/redux/rootReducers';
import {entitiesStateSelector} from 'shared/redux/rootSelector';
import {userLabsAdapter} from './LabsGrid.slice';

export const studentLabEntitiesStateSelector = createSelector(
	entitiesStateSelector,
	(state: EntitiesState) => state.userLabs
);

export const {selectAll: allStudentLabsSelector} = userLabsAdapter.getSelectors(studentLabEntitiesStateSelector);
