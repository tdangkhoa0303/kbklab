import {createSelector} from '@reduxjs/toolkit';
import {EntitiesState} from 'shared/redux/rootReducers';
import {entitiesStateSelector} from 'shared/redux/rootSelector';
import {playgroundAdapter} from './PlaygroundGrid.slice';

export const playgroundEntitiesStateSelector = createSelector(
  entitiesStateSelector,
  (state: EntitiesState) => state.playgrounds
);

export const {selectAll: allPlaygroundsSelector, selectById: playgroundByIdSelector} = playgroundAdapter.getSelectors(playgroundEntitiesStateSelector);
