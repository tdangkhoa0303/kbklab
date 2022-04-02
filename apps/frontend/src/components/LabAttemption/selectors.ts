import {createSelector} from '@reduxjs/toolkit';
import {UIState} from 'shared/redux/rootReducers';
import {uiStateSelector} from 'shared/redux/rootSelector';

export const finishLabStatusSelector = createSelector(
  uiStateSelector,
  (state: UIState) => state.labAttemption.finishLabStatus
);

export const attemptLabStatusSelector = createSelector(
  uiStateSelector,
  (state: UIState) => state.labAttemption.attemptLabStatus
);
