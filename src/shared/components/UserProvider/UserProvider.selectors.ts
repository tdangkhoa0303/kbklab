import {createSelector} from '@reduxjs/toolkit';
import {uiStateSelector} from 'shared/redux/rootSelector';
import {UIState} from 'shared/redux/rootReducers';
import {UIUserState} from './UserProvider.types';

export const userUIStateSelector = createSelector(
	uiStateSelector,
	(uiState: UIState) => uiState.user
)

export const isLoginSuccessSelector = createSelector(
	userUIStateSelector,
	(userUIState: UIUserState) => userUIState.isLoginSuccess
);

export const fetchUserInfoStatusSelector = createSelector(
	userUIStateSelector,
	(userUIState: UIUserState) => userUIState.fetchUserInfoStatus
)