import {createSelector} from '@reduxjs/toolkit';
import {EntitiesState, UIState} from 'shared/redux/rootReducers';
import {entitiesStateSelector, uiStateSelector} from 'shared/redux/rootSelector';
import {ResponseStatus} from '../../shared/constants';
import {playgroundAdapter} from './PlaygroundGrid.slice';
import {PlaygroundUIState} from './PlaygroundGrid.types';

export const playgroundEntitiesStateSelector = createSelector(
  entitiesStateSelector,
  (state: EntitiesState) => state.playgrounds
);

export const playgroundUIStateSelector = createSelector(
  uiStateSelector,
  (uiState: UIState): PlaygroundUIState => uiState.playgrounds,
)

export const startPlaygroundStatusSelector = createSelector(
  playgroundUIStateSelector,
  (uiState: PlaygroundUIState): ResponseStatus | null => uiState.startPlaygroundStatus
)

export const finishPlaygroundStatusSelector = createSelector(
  playgroundUIStateSelector,
  (uiState: PlaygroundUIState): ResponseStatus | null => uiState.finishPlaygroundStatus
)

export const {selectAll: allPlaygroundsSelector, selectById: playgroundByIdSelector} = playgroundAdapter.getSelectors(playgroundEntitiesStateSelector);
