import {createSelector} from '@reduxjs/toolkit';
import {RootState, UserState} from '../../constants';

export const userStateSelector = (state: RootState): UserState => state.user;

export const isLoginSuccessSelector = createSelector(
  userStateSelector,
  (userState: UserState) => userState.isLoginSuccess
);

export const fetchUserInfoStatusSelector = createSelector(
  userStateSelector,
  (userState: UserState) => userState.fetchUserInfoStatus
);
