import { EntitiesState, RootState, UIState } from './rootReducers';

export const uiStateSelector = (state: RootState): UIState => state.ui;

export const entitiesStateSelector = (state: RootState): EntitiesState =>
	state.entities;
