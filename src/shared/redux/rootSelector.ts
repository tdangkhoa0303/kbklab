import {EntitiesState, RootState, UIState} from './rootReducers';
import {UserState} from 'shared/components/UserProvider/UserProvider.types';

export const userSelector = (state: RootState): UserState => state.user;

export const uiStateSelector = (state: RootState): UIState => state.ui;

export const entitiesStateSelector = (state: RootState): EntitiesState => state.entities;